// package: Auth
// file: auth_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as auth_service_pb from "./auth_service_pb";

interface IAuthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signUp: IAuthService_ISignUp;
    signIn: IAuthService_ISignIn;
    renewToken: IAuthService_IRenewToken;
    getAccount: IAuthService_IGetAccount;
    deleteAccount: IAuthService_IDeleteAccount;
}

interface IAuthService_ISignUp extends grpc.MethodDefinition<auth_service_pb.NewAccount, auth_service_pb.SignUpResponse> {
    path: string; // "/Auth.Auth/SignUp"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.NewAccount>;
    requestDeserialize: grpc.deserialize<auth_service_pb.NewAccount>;
    responseSerialize: grpc.serialize<auth_service_pb.SignUpResponse>;
    responseDeserialize: grpc.deserialize<auth_service_pb.SignUpResponse>;
}
interface IAuthService_ISignIn extends grpc.MethodDefinition<auth_service_pb.UserCredentials, auth_service_pb.SignInResponse> {
    path: string; // "/Auth.Auth/SignIn"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.UserCredentials>;
    requestDeserialize: grpc.deserialize<auth_service_pb.UserCredentials>;
    responseSerialize: grpc.serialize<auth_service_pb.SignInResponse>;
    responseDeserialize: grpc.deserialize<auth_service_pb.SignInResponse>;
}
interface IAuthService_IRenewToken extends grpc.MethodDefinition<auth_service_pb.RenewRequest, auth_service_pb.RenewResponse> {
    path: string; // "/Auth.Auth/RenewToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.RenewRequest>;
    requestDeserialize: grpc.deserialize<auth_service_pb.RenewRequest>;
    responseSerialize: grpc.serialize<auth_service_pb.RenewResponse>;
    responseDeserialize: grpc.deserialize<auth_service_pb.RenewResponse>;
}
interface IAuthService_IGetAccount extends grpc.MethodDefinition<auth_service_pb.AccountRequest, auth_service_pb.AccountResponse> {
    path: string; // "/Auth.Auth/GetAccount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.AccountRequest>;
    requestDeserialize: grpc.deserialize<auth_service_pb.AccountRequest>;
    responseSerialize: grpc.serialize<auth_service_pb.AccountResponse>;
    responseDeserialize: grpc.deserialize<auth_service_pb.AccountResponse>;
}
interface IAuthService_IDeleteAccount extends grpc.MethodDefinition<auth_service_pb.DeleteAccountRequest, auth_service_pb.DeleteAccountResponse> {
    path: string; // "/Auth.Auth/DeleteAccount"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<auth_service_pb.DeleteAccountRequest>;
    requestDeserialize: grpc.deserialize<auth_service_pb.DeleteAccountRequest>;
    responseSerialize: grpc.serialize<auth_service_pb.DeleteAccountResponse>;
    responseDeserialize: grpc.deserialize<auth_service_pb.DeleteAccountResponse>;
}

export const AuthService: IAuthService;

export interface IAuthServer {
    signUp: grpc.handleUnaryCall<auth_service_pb.NewAccount, auth_service_pb.SignUpResponse>;
    signIn: grpc.handleUnaryCall<auth_service_pb.UserCredentials, auth_service_pb.SignInResponse>;
    renewToken: grpc.handleUnaryCall<auth_service_pb.RenewRequest, auth_service_pb.RenewResponse>;
    getAccount: grpc.handleUnaryCall<auth_service_pb.AccountRequest, auth_service_pb.AccountResponse>;
    deleteAccount: grpc.handleUnaryCall<auth_service_pb.DeleteAccountRequest, auth_service_pb.DeleteAccountResponse>;
}

export interface IAuthClient {
    signUp(request: auth_service_pb.NewAccount, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    signUp(request: auth_service_pb.NewAccount, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    signUp(request: auth_service_pb.NewAccount, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    signIn(request: auth_service_pb.UserCredentials, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    deleteAccount(request: auth_service_pb.DeleteAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
    deleteAccount(request: auth_service_pb.DeleteAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
    deleteAccount(request: auth_service_pb.DeleteAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
}

export class AuthClient extends grpc.Client implements IAuthClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public signUp(request: auth_service_pb.NewAccount, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    public signUp(request: auth_service_pb.NewAccount, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    public signUp(request: auth_service_pb.NewAccount, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignUpResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: auth_service_pb.UserCredentials, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: auth_service_pb.UserCredentials, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.SignInResponse) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    public renewToken(request: auth_service_pb.RenewRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.RenewResponse) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    public getAccount(request: auth_service_pb.AccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.AccountResponse) => void): grpc.ClientUnaryCall;
    public deleteAccount(request: auth_service_pb.DeleteAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
    public deleteAccount(request: auth_service_pb.DeleteAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
    public deleteAccount(request: auth_service_pb.DeleteAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_service_pb.DeleteAccountResponse) => void): grpc.ClientUnaryCall;
}
