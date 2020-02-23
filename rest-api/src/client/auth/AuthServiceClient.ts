import { credentials } from "grpc";

import { AuthClient } from "../generated/auth_service_grpc_pb";
import { UserCredentials, AuthErrorStatus, AccountRequest, NewAccount } from "../generated/auth_service_pb";
import { IJWTTokens, AccountWrapper, mapAccountInfo } from "../models";
import { AuthServiceError } from "./errors/AuthServiceError";
import { AuthService } from "./AuthService";
import { config } from "../../config/grpc";
import { GrpcClient } from "../GrpcClient";
import { SignUpError } from "./errors/SignUpError";

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
     * Get the client instance in secure way.
     *
     * @throws {Error} No known gRPC endpoints available
     */
    protected getClient(): AuthClient {
        this.updateClient();
        const client = this.client;
        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }
        return client;
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

    /**
     * Get account info.
     *
     * @param accessToken The access token
     */
    public getAccount = async (accessToken: string): Promise<AccountWrapper> => {
        const client = this.getClient();
        const req = new AccountRequest();
        req.setAccessToken(accessToken);

        return new Promise<AccountWrapper>((resolve, reject) => {
            client.getAccount(req, (err, res) => {
                if (err) {
                    return reject(err);
                }
                const error = res.getError();
                const account = res.getAccount();
                if (error || !account) {
                    return reject(
                        new AuthServiceError(
                            `Failed to get account: ${getAccountErrorReason(error)}`
                        )
                    );
                }
                return resolve(mapAccountInfo(account));
            });
        });
    }

    /**
     * Sign up.
     *
     * @param username The username
     * @param password The password
     */
    public signUp = async (
        username: string,
        password: string
    ): Promise<AccountWrapper> => {
        const client = this.getClient();
        const req = new NewAccount();
        req.setUsername(username);
        req.setPassword(password);

        return new Promise<AccountWrapper>((resolve, reject) => {
            client.signUp(req, (err, res) => {
                if (err) {
                    return reject(err);
                }

                const error = res.getError();
                const account = res.getAccount();
                if (error || !account) {
                    return reject(
                        new SignUpError("Signup failed", error)
                    );
                }
                return resolve(mapAccountInfo(account));
            });
        });
    }
}

/**
 * Stringify the `AuthErrorStatus`.
 *
 * @param status The status
 */
function getAccountErrorReason(status: AuthErrorStatus): string {
    switch (status) {
        case AuthErrorStatus.BAD_CREDENTIALS:
            return "BAD_CREDENTIALS";
        case AuthErrorStatus.EXPIRED_TOKEN:
            return "EXPIRED_TOKEN";
        case AuthErrorStatus.INVALID_TOKEN:
            return "INVALID_TOKEN";
        case AuthErrorStatus.NOT_FOUND:
            return "NOT_FOUND";
        case AuthErrorStatus.SERVER_ERROR:
            return "SERVER_ERROR";
        default:
            return "UNKNOWN";
    }
}
