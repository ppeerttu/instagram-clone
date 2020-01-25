import grpc from "grpc";
import redis from "redis";

import sequelize from "./config/sequelize";
import authHandler from "./handlers/AuthService";
import { protoIndex } from "./proto";


protoIndex();

const port = 3000;

export const startServer = (): void => {
    console.log("Starting server...");
    const server = new grpc.Server();
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
        },
    );

    server.start();
};

startServer();
