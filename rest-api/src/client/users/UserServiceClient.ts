import { credentials } from "grpc";

import { config } from "../../config/grpc";
import { UserClient } from "../generated/user_service_grpc_pb";
import { GrpcClient } from "../GrpcClient";
import { UserWrapper, mapUserInfo } from "../models";
import { UserService } from "./UserService";
import { GetUserRequest } from "../generated/user_service_pb";
import { GetUserError } from "./errors/GetUserError";

export class UserServiceClient extends GrpcClient implements UserService {

    protected serviceName = config.userService;

    private client: UserClient | null = null;

    protected updateClient() {
        const endpoint = this.getNewEndpoint();
        if (!endpoint) {
            this.currentEndpoint = null;
            this.client = null;
            return;
        }
        if (endpoint === this.currentEndpoint && this.client) {
            return;
        }
        this.client = new UserClient(
            endpoint,
            credentials.createInsecure(),
        );
        this.currentEndpoint = endpoint;
        return;
    }

    protected getClient(): UserClient {
        this.updateClient();
        const client = this.client;
        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }
        return client;
    }

    public getUserById = async (userId: string): Promise<UserWrapper> => {
        const client = this.getClient();
        const req = new GetUserRequest();
        req.setAccountId(userId); // Account and user has same ID

        return new Promise<UserWrapper>((resolve, reject) => {
            client.getUser(req, (err, res) => {
                if (err) {
                    return reject(err);
                }

                const error = res.getError();
                const user = res.getUser();
                if (error || !user) {
                    return reject(new GetUserError("Failed to get user", error));
                }
                return resolve(mapUserInfo(user));
            });
        });
    }
}
