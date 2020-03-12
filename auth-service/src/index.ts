import grpc from "grpc";
import pino from "pino";
import redis from "redis";

import { config as consulConfig } from "./config/consul";
import { kafkaClientOptions } from "./config/kafka";
import sequelize from "./config/sequelize";
import { config } from "./config/server";
import authHandler from "./handlers/AuthService";
import { KafkaProducer } from "./lib/kafka/KafkaProducer";
import { KubeLivenessManager, LivenessCheck } from "./lib/KubeLivenessManager";
import { ServiceDiscovery } from "./lib/ServiceDiscovery";
import { delay } from "./lib/utils";
import { protoIndex } from "./proto";

protoIndex();

const INITIAL_RE_REGISTER_INTERVAL = 5000;
const MAX_RE_REGITER_COUNT = 5;
const port = config.grpcPort;

let grpcReady = false;
const { consulEnabled } = consulConfig;
const logger = pino({ level: process.env.NODE_ENV === "development" ? "debug" : "info" });
const server = new grpc.Server();
const serviceDiscovery = ServiceDiscovery.getInstance();
const livenessManager = new KubeLivenessManager(
    config.healthCheckPort,
    config.healthCheckPath,
);

const redisClient = redis.createClient(config.redisPort, config.redisHost);
const producer = new KafkaProducer(kafkaClientOptions);

producer.prepareClient()
    .then(() => {
        logger.info("Kafka producer ready");
    })
    .catch(logger.error);

redisClient.on("connect", () => {
    logger.info("Redis client connected");
});
redisClient.on("error", (err) => {
    logger.error("Redis client got error " + err);
});

server.addService(
    authHandler.AuthService,
    new authHandler.AuthHandler(redisClient, producer),
);

server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, portNum) => {
        if (err !== null) {
            sequelize.close();
            return logger.error(err);
        }
        grpcReady = true;
        logger.info(`auth-service gRPC listening on ${portNum}`);
        if (!consulEnabled) {
            logger.info("Consul has been disabled, not registering service");
            return;
        }
        serviceDiscovery.registerService(handleHeartbeatFailure)
            .then(() => {
                const id = serviceDiscovery.instanceId;
                const name = serviceDiscovery.serviceName;
                logger.info(
                    `Instance registered to consul with name ${name} and id ${id}`,
                );
            })
            .catch((e) => {
                logger.error(e);
            });
    },
);

const serverCheck: LivenessCheck = async () => {
    if (!grpcReady) {
        throw new Error("The gRPC server is not available");
    }
};
const redisCheck: LivenessCheck = async () => {
    if (!redisClient.connected) {
        throw new Error("Redis client is not connected");
    }
};
const databaseCheck: LivenessCheck = async () => {
    try {
        await sequelize.authenticate();
    } catch (e) {
        throw new Error("Database client is not connected");
    }
};
const serviceDiscoveryCheck: LivenessCheck = async () => {
    if (!serviceDiscovery.isRegistered()) {
        throw new Error("Service discovery to Consul is not registered");
    }
};
const kafkaCheck: LivenessCheck = async () => {
    if (!producer.isConnected()) {
        throw new Error("Kafka producer is not connected");
    }
};
livenessManager.addChecks(
    serverCheck,
    redisCheck,
    databaseCheck,
    kafkaCheck,
);
if (consulEnabled) {
    livenessManager.addChecks(serviceDiscoveryCheck);
}
livenessManager.start()
    .then(() => logger.info("Liveness manager deployed"))
    .catch((err) => logger.error(err));

/**
 * Shutdown the GRPC server.
 */
function shutdownServer() {
    return new Promise((resolve) => {
        server.tryShutdown(() => {
            grpcReady = false;
            redisClient.quit(() => resolve());
        });
    });
}

/**
 * Shutdown handler when a signal is received.
 *
 * @param signal The received signal, e.g. `SIGINT`
 */
function onSignal(signal: string) {
    logger.info(`Received ${signal}, cleaning up and shutting down...`);
    const promises = [
        shutdownServer(),
        livenessManager.stop(),
    ];
    if (serviceDiscovery.isRegistered()) {
        promises.push(serviceDiscovery.deregister());
    }
    return Promise.all(promises)
        .catch(logger.error)
        .finally(() => process.exit(0));
}

/**
 * Handle failure heartbeat with consul.
 *
 * @param err The error
 */
function handleHeartbeatFailure(err: Error) {
    logger.error(err, "Heartbeat to consul failed");
    reRegisterServiceDiscovery()
        .catch((e: any) => logger.error(e));
}

/**
 * Re-register this particular instance to consul.
 *
 * @param count Count of re-registration trials
 */
async function reRegisterServiceDiscovery(count = 1): Promise<void> {
    if (count > MAX_RE_REGITER_COUNT) {
        logger.info(
            "Consul re-registration trial count exceeded max "
                + `value of ${MAX_RE_REGITER_COUNT}`,
        );
        return;
    }
    // Deregister if we are already registered
    if (serviceDiscovery.isRegistered()) {
        try {
            await serviceDiscovery.deregister();
        } catch (e) {
            const ms = count * INITIAL_RE_REGISTER_INTERVAL;
            logger.error(
                `Deregistration failed, trying again in ${ms / 1000} seconds...`,
                e,
            );
            await delay(ms);
            return reRegisterServiceDiscovery(count++);
        }
    }
    // Register to the consul
    try {
        await serviceDiscovery.registerService(handleHeartbeatFailure);
    } catch (e) {
        const ms = count * INITIAL_RE_REGISTER_INTERVAL;
        logger.error(
            `Re-registration failed, trying again in ${ms / 1000} seconds...`,
            e,
        );
        await delay(ms);
        return reRegisterServiceDiscovery(count++);
    }
    logger.info("Re-registration successful");
}

process.on("SIGTERM", onSignal);
process.on("SIGINT", onSignal);
process.on("SIGUSR1", onSignal);
process.on("SIGUSR2", onSignal);
process.on("SIGHUP", onSignal);
process.on("SIGBREAK", onSignal);

server.start();
