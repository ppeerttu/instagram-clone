// package: User
// file: user_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_service_pb from "./user_service_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IUserService_ICreate;
    delete: IUserService_IDelete;
    getUser: IUserService_IGetUser;
}

interface IUserService_ICreate extends grpc.MethodDefinition<user_service_pb.NewUser, user_service_pb.CreateUserResponse> {
    path: string; // "/User.User/Create"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_service_pb.NewUser>;
    requestDeserialize: grpc.deserialize<user_service_pb.NewUser>;
    responseSerialize: grpc.serialize<user_service_pb.CreateUserResponse>;
    responseDeserialize: grpc.deserialize<user_service_pb.CreateUserResponse>;
}
interface IUserService_IDelete extends grpc.MethodDefinition<user_service_pb.DeleteUserRequest, user_service_pb.DeleteUserResponse> {
    path: string; // "/User.User/Delete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_service_pb.DeleteUserRequest>;
    requestDeserialize: grpc.deserialize<user_service_pb.DeleteUserRequest>;
    responseSerialize: grpc.serialize<user_service_pb.DeleteUserResponse>;
    responseDeserialize: grpc.deserialize<user_service_pb.DeleteUserResponse>;
}
interface IUserService_IGetUser extends grpc.MethodDefinition<user_service_pb.GetUserRequest, user_service_pb.GetUserResponse> {
    path: string; // "/User.User/GetUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_service_pb.GetUserRequest>;
    requestDeserialize: grpc.deserialize<user_service_pb.GetUserRequest>;
    responseSerialize: grpc.serialize<user_service_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<user_service_pb.GetUserResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    create: grpc.handleUnaryCall<user_service_pb.NewUser, user_service_pb.CreateUserResponse>;
    delete: grpc.handleUnaryCall<user_service_pb.DeleteUserRequest, user_service_pb.DeleteUserResponse>;
    getUser: grpc.handleUnaryCall<user_service_pb.GetUserRequest, user_service_pb.GetUserResponse>;
}

export interface IUserClient {
    create(request: user_service_pb.NewUser, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    create(request: user_service_pb.NewUser, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    create(request: user_service_pb.NewUser, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    delete(request: user_service_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    delete(request: user_service_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    delete(request: user_service_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: user_service_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: user_service_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: user_service_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public create(request: user_service_pb.NewUser, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public create(request: user_service_pb.NewUser, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public create(request: user_service_pb.NewUser, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public delete(request: user_service_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public delete(request: user_service_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public delete(request: user_service_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: user_service_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: user_service_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: user_service_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_service_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
}
