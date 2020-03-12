// package: User
// file: user_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class NewUser extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): void;

    getAccountId(): string;
    setAccountId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NewUser.AsObject;
    static toObject(includeInstance: boolean, msg: NewUser): NewUser.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NewUser, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NewUser;
    static deserializeBinaryFromReader(message: NewUser, reader: jspb.BinaryReader): NewUser;
}

export namespace NewUser {
    export type AsObject = {
        username: string,
        accountId: string,
    }
}

export class CreateUserResponse extends jspb.Message { 
    getStatus(): CreateUserStatus;
    setStatus(value: CreateUserStatus): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
    static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
    export type AsObject = {
        status: CreateUserStatus,
    }
}

export class DeleteUserRequest extends jspb.Message { 
    getAccountId(): string;
    setAccountId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
    static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
    export type AsObject = {
        accountId: string,
    }
}

export class DeleteUserResponse extends jspb.Message { 
    getStatus(): DeleteUserStatus;
    setStatus(value: DeleteUserStatus): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserResponse): DeleteUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserResponse;
    static deserializeBinaryFromReader(message: DeleteUserResponse, reader: jspb.BinaryReader): DeleteUserResponse;
}

export namespace DeleteUserResponse {
    export type AsObject = {
        status: DeleteUserStatus,
    }
}

export class GetUserRequest extends jspb.Message { 
    getAccountId(): string;
    setAccountId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserRequest;
    static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
    export type AsObject = {
        accountId: string,
    }
}

export class GetUserResponse extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserInfo | undefined;
    setUser(value?: UserInfo): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetUserResponseError;
    setError(value: GetUserResponseError): void;


    getStatusCase(): GetUserResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserResponse;
    static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
    export type AsObject = {
        user?: UserInfo.AsObject,
        error: GetUserResponseError,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    USER = 1,

    ERROR = 2,

    }

}

export class UserInfo extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUsername(): string;
    setUsername(value: string): void;

    getCreatedAt(): string;
    setCreatedAt(value: string): void;

    getUpdatedAt(): string;
    setUpdatedAt(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserInfo.AsObject;
    static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserInfo;
    static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
    export type AsObject = {
        id: string,
        username: string,
        createdAt: string,
        updatedAt: string,
    }
}

export enum CreateUserStatus {
    CREATE_USER_SERVER_ERROR = 0,
    USERNAME_ALREADY_EXISTS = 1,
    ACCOUNT_ID_ALREADY_EXISTS = 2,
    USER_CREATED = 3,
}

export enum DeleteUserStatus {
    DELETE_USER_SERVER_ERROR = 0,
    ACCOUNT_ID_NOT_EXIST = 1,
    USER_DELETED = 2,
}

export enum GetUserResponseError {
    GET_USER_SERVER_ERROR = 0,
    ACCOUNT_ID_NOT_FOUND = 1,
}
