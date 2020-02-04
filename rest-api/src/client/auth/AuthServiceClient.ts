import { credentials } from "grpc";

import { AuthClient } from "../generated/auth_service_grpc_pb";
import { UserCredentials, AuthErrorStatus } from "../generated/auth_service_pb";
import { IJWTTokens } from "../models";
import { AuthServiceError } from "./AuthServiceError";
import { AuthService } from "./AuthService";
import { config } from "../../config/grpc";
import { GrpcClient } from "../GrpcClient";

/**
 * A client for consuming the external authentication service.
 */
export class AuthServiceClient extends GrpcClient implements AuthService {

    protected serviceName: string = config.authService;

    /**
     * The actual gRPC client instance
     */
    private client: AuthClient | null = null;

    protected updateClient() {
        // Pick new remote endpoint for gRPC client
        const endpoint = this.getNewEndpoint();
        if (!endpoint) {
            this.client = null;
            return;
        }
        // We should already have this endpoint assigned to the client
        if (endpoint === this.currentEndpoint && this.client) {
            return;
        }
        this.client = new AuthClient(
            endpoint,
            credentials.createInsecure(),
        );
        this.currentEndpoint = endpoint;
        return;
    }


    /**
     * Tear down the client.
     */
    public tearDown() {
        super.tearDown();
        if (this.client) {
            this.client.close();
        }
    }

    /**
     * Sign the user in.
     *
     * @param username The username
     * @param password The password
     */
    public signIn = async (username: string, password: string) => {

        const creds = new UserCredentials();
        creds.setUsername(username);
        creds.setPassword(password);

        this.updateClient();
        const client = this.client;

        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }

        return new Promise<IJWTTokens>((resolve, reject) => {
            this.client!.signIn(creds, (e, response) => {
                if (e) {
                    return reject(e);
                }
                const error = response.getError();
                const tokens = response.getTokens();
                if (!tokens || error) {
                    let reason = "Unknown error";
                    switch (error) {
                        case AuthErrorStatus.BAD_CREDENTIALS:
                            reason = "Bad credentials";
                            break;
                        case AuthErrorStatus.NOT_FOUND:
                            // The requester doesn't have to know whether or not a user
                            // exists
                            reason = "Bad credentials";
                            break;
                        case AuthErrorStatus.SERVER_ERROR:
                            reason = "Server error";
                            break;
                    }
                    return reject(new AuthServiceError(reason));
                } else {
                    return resolve({
                        accessToken: tokens.getAccessToken(),
                        refreshToken: tokens.getRefreshToken(),
                    });
                }
            });
        });
    }
}
