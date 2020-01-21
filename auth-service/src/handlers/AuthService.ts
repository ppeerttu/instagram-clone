import grpc from "grpc";

import { AuthService, IAuthServer } from "../proto/auth/auth_service_grpc_pb";
import {
    AccountInfo,
    AccountRequest,
    JWTTokens,
    RenewRequest,
    UserCredentials,
} from "../proto/auth/auth_service_pb";

class AuthHandler implements IAuthServer {

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
