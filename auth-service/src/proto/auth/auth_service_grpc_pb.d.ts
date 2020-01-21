// package: 
// file: auth_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as auth_service_pb from "./auth_service_pb";

interface IAuthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signIn: IAuthService_ISignIn;
    renewToken: IAuthService_IRenewToken;
    getAccount: IAuthService_IGetAccount;
}

interface IAuthService_ISignIn extends grpc.MethodDefinition<auth_service_pb.UserCredentials, auth_service_pb.JWTTokens> {
    path: string; // "/.Auth/SignIn"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.UserCredentials>;
    requestDeserialize: grpc.deserialize<auth_service_pb.UserCredentials>;
    responseSerialize: grpc.serialize<auth_service_pb.JWTTokens>;
    responseDeserialize: grpc.deserialize<auth_service_pb.JWTTokens>;
}
interface IAuthService_IRenewToken extends grpc.MethodDefinition<auth_service_pb.RenewRequest, auth_service_pb.JWTTokens> {
    path: string; // "/.Auth/RenewToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.RenewRequest>;
    requestDeserialize: grpc.deserialize<auth_service_pb.RenewRequest>;
    responseSerialize: grpc.serialize<auth_service_pb.JWTTokens>;
    responseDeserialize: grpc.deserialize<auth_service_pb.JWTTokens>;
}
interface IAuthService_IGetAccount extends grpc.MethodDefinition<auth_service_pb.AccountRequest, auth_service_pb.AccountInfo> {
    path: string; // "/.Auth/GetAccount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.AccountRequest>;
    requestDeserialize: grpc.deserialize<auth_service_pb.AccountRequest>;
    responseSerialize: grpc.serialize<auth_service_pb.AccountInfo>;
    responseDeserialize: grpc.deserialize<auth_service_pb.AccountInfo>;
}

export const AuthService: IAuthService;

export interface IAuthServer {
    signIn: grpc.handleUnaryCall<auth_service_pb.UserCredentials, auth_service_pb.JWTTokens>;
    renewToken: grpc.handleUnaryCall<auth_service_pb.RenewRequest, auth_service_pb.JWTTokens>;
    getAccount: grpc.handleUnaryCall<auth_service_pb.AccountRequest, auth_service_pb.AccountInfo>;
}

export interface IAuthClient {
    signIn(request: auth_service_pb.UserCredentials, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
}

export class AuthClient extends grpc.Client implements IAuthClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public signIn(request: auth_service_pb.UserCredentials, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.JWTTokens) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountInfo) => void): grpc.ClientUnaryCall;
}
