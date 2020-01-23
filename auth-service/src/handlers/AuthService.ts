import bcrypt from "bcrypt";
import grpc from "grpc";
import jwt from "jsonwebtoken";

import { config } from "../config/auth";
import { createAccessToken, createRefreshToken } from "../lib/tokens";
import { Account } from "../models/Account";
import { AuthService, IAuthServer } from "../proto/auth/auth_service_grpc_pb";
import {
    AccountInfo,
    AccountRequest,
    AuthErrorStatus,
    JWTTokens,
    NewAccount,
    RenewRequest,
    SignUpResponse,
    SignInResponse,
    UserCredentials,
} from "../proto/auth/auth_service_pb";

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
                    return response;
                }
                return bcrypt.hash(
                    call.request.getPassword(),
                    12, // The more rounds, the longer it takes to hash
                )
                    .then((passwordHash) => {
                        return Account.create({
                            username,
                            passwordHash,
                        });
                    })
                    .then((account) => {
                        response.setMessage(`Created user ${account.username}`);
                        return response;
                    });
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
        callback: grpc.sendUnaryData<SignInResponse>,
    ): void => {
        const username = call.request.getUsername();
        const password = call.request.getPassword();
        const response: SignInResponse = new SignInResponse();
        Account.findOne({ where: { username }})
            .then((account) => {
                if (!account) {
                    response.setError(AuthErrorStatus.NOT_FOUND);
                    return null;
                }
                return bcrypt.compare(password, account.passwordHash)
                    .then((matches) => {
                        if (!matches) {
                            response.setError(AuthErrorStatus.BAD_CREDENTIALS);
                            return null;
                        }
                        return account;
                    });
            })
            .then((authenticatedAccount) => {
                const tokens = new JWTTokens();
                if (authenticatedAccount) {
                    tokens.setAccessToken(createAccessToken(authenticatedAccount));
                    tokens.setRefreshToken(createRefreshToken(authenticatedAccount));
                    response.setTokens(tokens);
                }
                callback(null, response);
            })
            .catch((err) => {
                console.error(err);
                response.setError(AuthErrorStatus.SERVER_ERROR);
                return callback(null, response);
            });
    }

    /**
     * Renew a refresh token into new pair of access and refresh tokens.
     */
    public renewToken = (
        call: grpc.ServerUnaryCall<RenewRequest>,
        callback: grpc.sendUnaryData<JWTTokens>,
    ): void => {
        const response = new JWTTokens();
        // TODO: Implement the logic for renewing tokens
        callback(null, response);
    }

    /**
     * Get account information based on given access token.
     */
    public getAccount = (
        call: grpc.ServerUnaryCall<AccountRequest>,
        callback: grpc.sendUnaryData<AccountInfo>,
    ): void => {
        const accessToken = call.request.getAccessToken();

        // This could be done synchronously as well
        jwt.verify(
            accessToken,
            config.accessToken.secret,
            (error, decoded: any) => {
                if (error) {
                    console.error(error);
                    callback(null, new AccountInfo());
                    return;
                }

                Account.findByPk(decoded.sub)
                    .then((account) => {
                        const response = new AccountInfo();
                        if (!account) {
                            return callback(null, response);
                        }
                        response.setId(account.id);
                        response.setUsername(account.username);
                        response.setCreatedAt(account.createdAt.toJSON());
                        response.setUpdatedAt(account.updatedAt.toJSON());
                        callback(null, response);
                    })
                    .catch((err) => {
                        console.error(err);
                        return callback(null, new AccountInfo());
                    });
            },
        );
    }
}

export default {
    AuthHandler,
    AuthService,
};
