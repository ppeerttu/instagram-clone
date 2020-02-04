import grpc from "grpc";
import redis from "redis";

import sequelize from "./config/sequelize";
import { config } from "./config/server";
import authHandler from "./handlers/AuthService";
import { ServiceDiscovery } from "./lib/ServiceDiscovery";
import { delay } from "./lib/utils";
import { protoIndex } from "./proto";

protoIndex();

const INITIAL_RE_REGISTER_INTERVAL = 5000;
const MAX_RE_REGITER_COUNT = 5;
const port = config.grpcPort;

const server = new grpc.Server();
const serviceDiscovery = ServiceDiscovery.getInstance();

const redisClient = redis.createClient(6379, "0.0.0.0");

redisClient.on("connect", () => {
    console.log("Redis client connected");
});
redisClient.on("error", (err) => {
    console.error("Redis client got error " + err);
});

server.addService(authHandler.AuthService, new authHandler.AuthHandler());

server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, portNum) => {
        if (err !== null) {
            sequelize.close();
            return console.error(err);
        }
        console.log(`auth-service gRPC listening on ${portNum}`);
        serviceDiscovery.registerService(handleHeartbeatFailure)
            .then(() => {
                const id = serviceDiscovery.instanceId;
                const name = serviceDiscovery.serviceName;
                console.log(
                    `Instance registered to consul with name ${name} and id ${id}`,
                );
            })
            .catch((e) => {
                console.error(e);
            });
    },
);

/**
 * Shutdown the GRPC server.
 */
function shutdownServer() {
    return new Promise((resolve) => {
        server.tryShutdown(() => resolve());
    });
}

/**
 * Shutdown handler when a signal is received.
 *
 * @param signal The received signal, e.g. `SIGINT`
 */
function onSignal(signal: string) {
    console.info(`Received ${signal}, cleaning up and shutting down...`);
    const promises = [
        shutdownServer(),
    ];
    if (serviceDiscovery.isRegistered()) {
        promises.push(serviceDiscovery.deregister());
    }
    return Promise.all(promises)
        .catch(console.error)
        .finally(() => process.exit(0));
}

/**
 * Handle failure heartbeat with consul.
 *
 * @param err The error
 */
function handleHeartbeatFailure(err: Error) {
    console.error(err, "Heartbeat to consul failed");
    reRegisterServiceDiscovery()
        .catch((e: any) => console.error(e));
}

/**
 * Re-register this particular instance to consul.
 *
 * @param count Count of re-registration trials
 */
async function reRegisterServiceDiscovery(count = 1): Promise<void> {
    if (count > MAX_RE_REGITER_COUNT) {
        console.info(
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
            console.error(
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
        console.error(
            `Re-registration failed, trying again in ${ms / 1000} seconds...`,
            e,
        );
        await delay(ms);
        return reRegisterServiceDiscovery(count++);
    }
    console.info("Re-registration successful");
}

process.on("SIGTERM", onSignal);
process.on("SIGINT", onSignal);
process.on("SIGUSR1", onSignal);
process.on("SIGUSR2", onSignal);
process.on("SIGHUP", onSignal);
process.on("SIGBREAK", onSignal);

server.start();
