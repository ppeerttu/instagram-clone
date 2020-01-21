import grpc from "grpc";

import { AuthService, IAuthServer } from "../proto/auth/auth_service_grpc_pb";
import {
    AccountInfo,
    AccountRequest,
    JWTTokens,
    NewAccount,
    RenewRequest,
    SignUpResponse,
    UserCredentials,
} from "../proto/auth/auth_service_pb";

import { Account } from "../models/Account";

/**
 * A handler for auth service.
 */
class AuthHandler implements IAuthServer {

    /**
     * Sign an account in.
     */
    public signUp = (
        call: grpc.ServerUnaryCall<NewAccount>,
        callback: grpc.sendUnaryData<SignUpResponse>,
    ): void => {
        const username = call.request.getUsername();
        Account.findOne({
            where: {
                username,
            },
        })
            .then((exists) => {
                const response = new SignUpResponse();
                if (exists) {
                    response.setMessage(`Username ${username} is already taken`);
                } else {
                    return Account.create({
                        username,
                        passwordHash: call.request.getPassword(),
                    })
                        .then((account) => {
                            response.setMessage(`Created user ${account.username}`);
                            return response;
                        });
                }
                return response;
            })
            .then((response) => {
                callback(null, response);
            })
            .catch((e) => {
                console.error(e);
                callback(null, new SignUpResponse());
            });
    }

    /**
     * Sign an account in.
     */
    public signIn = (
        call: grpc.ServerUnaryCall<UserCredentials>,
        callback: grpc.sendUnaryData<JWTTokens>,
    ): void => {
        const response = new JWTTokens();
        response.setAccessToken("access");
        response.setRefreshToken("refresh");
        console.info(`Signing in user ${call.request.getUsername()}`);
        callback(null, response);
    }

    /**
     * Renew a refresh token into new pair of access and refresh tokens.
     */
    public renewToken = (
        call: grpc.ServerUnaryCall<RenewRequest>,
        callback: grpc.sendUnaryData<JWTTokens>,
    ): void => {
        console.info("Received refresh token:", call.request.getRefreshToken());
        const response = new JWTTokens();
        response.setAccessToken("access");
        response.setRefreshToken("refresh");
        callback(null, response);
    }

    /**
     * Get account information based on given access token.
     */
    public getAccount = (
        call: grpc.ServerUnaryCall<AccountRequest>,
        callback: grpc.sendUnaryData<AccountInfo>,
    ): void => {
        console.info("Getting account info for token:", call.request.getAccessToken());
        const response = new AccountInfo();
        response.setId("1");
        response.setUsername("johndoe");
        response.setCreatedAt(new Date().toJSON());
        response.setUpdatedAt(new Date().toJSON());
        callback(null, response);
    }
}

export default {
    AuthHandler,
    AuthService,
};
