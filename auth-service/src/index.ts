import grpc from "grpc";

import authHandler from "./handlers/AuthService";
import { protoIndex } from "./proto";


protoIndex();

const port = 50051;

export const startServer = (): void => {
    const server = new grpc.Server();

    server.addService(authHandler.AuthService, new authHandler.AuthHandler());

    server.bindAsync(
        `0.0.0.0:${port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err !== null) {
                return console.error(err);
            }
            console.log(`gRPC listening on ${port}`);
        }
    );

    server.start();
};

startServer();
