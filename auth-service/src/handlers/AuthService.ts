import grpc from "grpc";

import { AuthService, IAuthServer } from "../proto/auth/auth_service_grpc_pb";
import {
    AccountInfo,
    AccountRequest,
    JWTTokens,
    RenewRequest,
    UserCredentials,
} from "../proto/auth/auth_service_pb";

/**
 * A handler for auth service.
 */
class AuthHandler implements IAuthServer {

    /**
     * Sign an account in.
     */
    public signIn = (
        call: grpc.ServerUnaryCall<UserCredentials>,
        callback: grpc.sendUnaryData<JWTTokens>,
    ): void => {
        const response = new JWTTokens();
        response.setAccesstoken("access");
        response.setRefreshtoken("refresh");
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
        console.info("Received refresh token:", call.request.getRefreshtoken());
        const response = new JWTTokens();
        response.setAccesstoken("access");
        response.setRefreshtoken("refresh");
        callback(null, response);
    }

    /**
     * Get account information based on given access token.
     */
    public getAccount = (
        call: grpc.ServerUnaryCall<AccountRequest>,
        callback: grpc.sendUnaryData<AccountInfo>,
    ): void => {
        console.info("Getting account info for token:", call.request.getAccesstoken());
        const response = new AccountInfo();
        response.setId("1");
        response.setUsername("johndoe");
        response.setCreatedat(new Date().toJSON());
        response.setUpdatedat(new Date().toJSON());
        callback(null, response);
    }
}

export default {
    AuthHandler,
    AuthService,
};
