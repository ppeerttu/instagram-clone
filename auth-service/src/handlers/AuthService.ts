import bcrypt from "bcrypt";
import grpc from "grpc";
import jwt from "jsonwebtoken";
import { RedisClient } from "redis";

import { config } from "../config/auth";
import { createAccessToken, createRefreshToken, verifyToken } from "../lib/tokens";
import { Account } from "../models/Account";
import { AuthService, IAuthServer } from "../proto/generated/auth_service_grpc_pb";
import {
    AccountRequest,
    AuthErrorStatus,
    JWTTokens,
    NewAccount,
    RenewRequest,
    RenewResponse,
    SignInResponse,
    SignUpResponse,
    UserCredentials,
    DeleteAccountRequest,
    AccountResponse,
    DeleteAccountResponse,
    DeleteAccountErrorStatus,
    SignUpErrorStatus,
} from "../proto/generated/auth_service_pb";
import { accountToAccountInfo,
    getFromRedis,
    validateCredential } from "../lib/utils";

/**
 * A handler for auth service.
 */
class AuthHandler implements IAuthServer {

    private redisClient: RedisClient;

    constructor(client: RedisClient) {
        this.redisClient = client;
    }

    /**
     * Sign an account in.
     */
    public signUp = async (
        call: grpc.ServerUnaryCall<NewAccount>,
        callback: grpc.sendUnaryData<SignUpResponse>,
    ): Promise<void> => {
        const username = call.request.getUsername();
        const password = call.request.getPassword();
        const response = new SignUpResponse();
        if (!validateCredential(password)) {
            response.setError(SignUpErrorStatus.SIGNUP_INVALID_PASSWORD);
        } else if (!validateCredential(username)) {
            response.setError(SignUpErrorStatus.SIGNUP_INVALID_USERNAME);
        } else {
            try {
                const account = await Account.findOne({ where: { username }});
                if (account) {
                    response.setError(SignUpErrorStatus.USERNAME_IN_USE);
                } else {
                    const passwordHash = await bcrypt.hash(password, 12);
                    const newAccount = await Account.create({ username, passwordHash });
                    response.setAccount(accountToAccountInfo(newAccount));
                }
            } catch (e) {
                response.setError(SignUpErrorStatus.SIGNUP_SERVER_ERROR);
            }
        }
        return callback(null, response);
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
                    const refreshToken = createRefreshToken(authenticatedAccount);
                    tokens.setAccessToken(createAccessToken(authenticatedAccount));
                    tokens.setRefreshToken(refreshToken);
                    response.setTokens(tokens);
                    this.redisClient.set(authenticatedAccount.id, JSON.stringify({
                        refresh_token: refreshToken,
                    }));
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
    public renewToken = async (
        call: grpc.ServerUnaryCall<RenewRequest>,
        callback: grpc.sendUnaryData<RenewResponse>,
    ): Promise<void> => {
        const response = new RenewResponse();
        const refreshToken = call.request.getRefreshToken();
        try {
            const payload = await verifyToken(refreshToken, config.refreshToken.secret);
            const tokens = new JWTTokens();
            const account = await Account.findByPk(payload.sub);
            if (account) {
                const tokenFromRedis = await getFromRedis(account.id, this.redisClient);
                if (tokenFromRedis &&
                    refreshToken === JSON.parse(tokenFromRedis).refresh_token) {
                const newAccessToken = createAccessToken(account, config.audience);
                const newRefreshToken = createRefreshToken(account, config.audience);
                tokens.setAccessToken(newAccessToken);
                tokens.setRefreshToken(newRefreshToken);
                this.redisClient.set(account.id, JSON.stringify({
                    refresh_token: refreshToken,
                }));
                response.setTokens(tokens);
                } else {
                    response.setError(AuthErrorStatus.EXPIRED_TOKEN);
                }
            } else {
                response.setError(AuthErrorStatus.NOT_FOUND);
            }
        } catch (e) {
            switch (e.name) {
                case "JsonWebTokenError":
                    response.setError(AuthErrorStatus.INVALID_TOKEN);
                    break;
                case "TokenExpiredError":
                    response.setError(AuthErrorStatus.EXPIRED_TOKEN);
                    break;
                default:
                    console.error("Error verifying refresh token, cause:", e);
                    response.setError(AuthErrorStatus.SERVER_ERROR);
            }
        }
        callback(null, response);
    }

    /**
     * Get account information based on given access token.
     */
    public getAccount = async (
        call: grpc.ServerUnaryCall<AccountRequest>,
        callback: grpc.sendUnaryData<AccountResponse>,
    ): Promise<void> => {
        const accessToken = call.request.getAccessToken();
        const response = new AccountResponse();
        // This could be done synchronously as well
        try {
            const payload = await verifyToken(accessToken, config.accessToken.secret);
            const account = await Account.findByPk(payload.sub);
            if (!account) {
                response.setError(AuthErrorStatus.NOT_FOUND);
            } else {
                const accountInfo = accountToAccountInfo(account);
                response.setAccount(accountInfo);
            }
        } catch (e) {
            switch (e.name) {
                case "JsonWebTokenError":
                    response.setError(AuthErrorStatus.INVALID_TOKEN);
                    break;
                case "TokenExpiredError":
                    response.setError(AuthErrorStatus.EXPIRED_TOKEN);
                    break;
                default:
                    console.error("Error verifying access token:", e);
                    response.setError(AuthErrorStatus.SERVER_ERROR);
            }
        }
        return callback(null, response);
    }

    public deleteAccount = async (
        call: grpc.ServerUnaryCall<DeleteAccountRequest>,
        callback: grpc.sendUnaryData<DeleteAccountResponse>,
    ): Promise<void> => {
        const accessToken = call.request.getAccessToken();
        const response = new DeleteAccountResponse();
        try {
            const payload = await verifyToken(accessToken, config.accessToken.secret);
            const account = await Account.findByPk(payload.sub);
            if (!account) {
                response.setError(DeleteAccountErrorStatus.DELETE_NOT_FOUND);
            } else {
                await account.destroy();
                response.setId(payload.sub);
            }
        } catch (e) {
            switch (e.name) {
                case "JsonWebTokenError":
                    response.setError(DeleteAccountErrorStatus.DELETE_INVALID_TOKEN);
                    break;
                case "TokenExpiredError":
                    response.setError(DeleteAccountErrorStatus.DELETE_TOKEN_EXPIRED);
                    break;
                default:
                    console.error("Error verifying access token:", e);
                    response.setError(DeleteAccountErrorStatus.DELETE_SERVER_ERROR);
            }
        }
        return callback(null, response);
    }
}

export default {
    AuthHandler,
    AuthService,
};
