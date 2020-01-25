import { AuthClient } from "./generated/auth_service_grpc_pb";
import { UserCredentials, AuthErrorStatus } from "./generated/auth_service_pb";
import { credentials } from "grpc";
import { IJWTTokens } from "./models";
import { AuthServiceError } from "./errors/AuthServiceError";
import { config } from "../config/grpc";

const authClient = new AuthClient(config.authService, credentials.createInsecure());

/**
 * A client for consuming the external authentication service.
 */
export class AuthServiceClient {

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

        return new Promise<IJWTTokens>((resolve, reject) => {
            authClient.signIn(creds, (e, response) => {
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
