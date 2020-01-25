import consul from "consul";
import { credentials } from "grpc";

import { AuthClient } from "../generated/auth_service_grpc_pb";
import { UserCredentials, AuthErrorStatus } from "../generated/auth_service_pb";
import { IJWTTokens } from "../models";
import { AuthServiceError } from "./AuthServiceError";
import { AuthService } from "./AuthService";
import { ServiceDiscovery } from "../../lib/ServiceDiscovery";
import { config } from "../../config/grpc";

/**
 * A client for consuming the external authentication service.
 */
export class AuthServiceClient implements AuthService {

    /**
     * The actual gRPC client instance
     */
    private client!: AuthClient;

    /**
     * Known auth-service endpoints
     */
    private knownEndpoints: string[] = [];

    /**
     * Watcher instance for watching changes in auth-service
     */
    private watcher: consul.Watch | null = null;

    /**
     * Tear down the client.
     */
    public tearDown() {
        if (this.watcher) {
            this.watcher.removeAllListeners();
            this.watcher.end();
        }
        if (this.client) {
            this.client.close();
        }
    }

    /**
     * Bind a watcher to the client in order to know where the services are available.
     *
     * @param sd The service discovery
     */
    public bindWatch(sd: ServiceDiscovery) {
        this.watcher = sd.getWatcher(config.authService);
        this.watcher.on("change", (data) => {
            if (Array.isArray(data)) {
                const newEndpoints = [];
                for (const entry of data) {
                    newEndpoints.push(
                        `${entry.Service.Address}:${entry.Service.Port}`,
                    );
                }
                this.knownEndpoints = newEndpoints;
            }
        });

        this.watcher.on("error", (err) => {
            console.error(err);
        });
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

        this.prepareClient();

        return new Promise<IJWTTokens>((resolve, reject) => {
            this.client.signIn(creds, (e, response) => {
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

    /**
     * Prepare the gRPC client.
     */
    private prepareClient() {
        const endpoints = this.knownEndpoints;
        if (endpoints.length < 1) {
            throw new Error("No known endpoints for auth-service");
        }
        // No reason to change the endpoint
        if (endpoints.length === 1 && this.client) {
            return;
        }
        const endpoint = this.knownEndpoints[
            Math.floor(Math.random() * endpoints.length)
        ];
        this.client = new AuthClient(
            endpoint,
            credentials.createInsecure(),
        );
        return;
    }
}
