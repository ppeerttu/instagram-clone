import grpc from "grpc";

import sequelize from "./config/sequelize";
import authHandler from "./handlers/AuthService";
import { protoIndex } from "./proto";


protoIndex();

const port = 3000;

export const startServer = (): void => {
    const server = new grpc.Server();

    server.addService(authHandler.AuthService, new authHandler.AuthHandler());

    server.bindAsync(
        `0.0.0.0:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, portNum) => {
            if (err !== null) {
                sequelize.close();
                return console.error(err);
            }
            console.log(`gRPC listening on ${portNum}`);
        }
    );

    server.start();
};

startServer();
