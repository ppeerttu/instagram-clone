import { createTerminus } from "@godaddy/terminus";
import http from "http";
import pino from "pino";

import { config } from "../config/server";
import { ServiceDiscovery } from "../lib/ServiceDiscovery";
import { delay } from "../lib/utils";
import Server from "../Server";
import { AuthServiceClient } from "../client/auth";
import { ImageServiceClient } from "../client/images/ImageServiceClient";

const MAX_RE_REGITER_COUNT = 5;
const INITIAL_RE_REGISTER_INTERVAL = 5000;

const serviceDiscovery = ServiceDiscovery.getInstance();
const logger = pino();
const authClient = new AuthServiceClient();
const imageClient = new ImageServiceClient();
authClient.bindWatch(serviceDiscovery);

const application = new Server(logger);
application.configure();
application.bindRoutes(authClient, imageClient);

const server = http.createServer(application.app.callback());

server.on("error", (error: any) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr ? addr.port : "N/A"}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.add("error", bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.add("error", bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});

server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr ? addr.port : "N/A"}`;
    logger.info(`Server listening on ${bind}`);

    const name = serviceDiscovery.getServiceName();
    const id = serviceDiscovery.getInstanceId();
    serviceDiscovery.registerService(handleHeartbeatFailure)
        .then(() => {
            logger.info(`Instance registered to consul with name ${name} and id ${id}`);
        })
        .catch((err) => {
            logger.error(err, "Service registration to consul failed");
        });
});

// Terminus handles shutdowns grafecully
createTerminus(
    server,
    {
        onSignal: () => {
            logger.info("Received signal, starting cleanup...");
            const promises = serviceDiscovery.isRegistered()
                ? [serviceDiscovery.deregister()]
                : [];
            return Promise.all(promises);
        },
        onShutdown: () => {
            logger.info("Cleanup finished, shutting down...");
            return Promise.resolve();
        },
        healthChecks: {
            "/health": () => {
                const healthy = serviceDiscovery.isRegistered();
                if (!healthy) {
                    return Promise.reject(new Error("Not registered"));
                }
                return Promise.resolve();
            },
        },
        signals: ["SIGTERM", "SIGINT", "SIGUSR1", "SIGUSR2"],
        timeout: 5000,
    }
);

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
                + `value of ${MAX_RE_REGITER_COUNT}`
        );
        return;
    }
    // Deregister if we are already registered
    if (serviceDiscovery.isRegistered()) {
        try {
            await serviceDiscovery.deregister();
        } catch (e) {
            const ms = count * INITIAL_RE_REGISTER_INTERVAL;
            logger.error(e, `Deregistration failed, trying again in ${ms / 1000} seconds...`);
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
            e,
            `Re-registration failed, trying again in ${ms / 1000} seconds...`
        );
        await delay(ms);
        return reRegisterServiceDiscovery(count++);
    }
    logger.info("Re-registration successful");
}

server.listen(config.port);
