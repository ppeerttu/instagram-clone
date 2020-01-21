// package: 
// file: auth_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UserCredentials extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): void;

    getPassword(): string;
    setPassword(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserCredentials.AsObject;
    static toObject(includeInstance: boolean, msg: UserCredentials): UserCredentials.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserCredentials, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserCredentials;
    static deserializeBinaryFromReader(message: UserCredentials, reader: jspb.BinaryReader): UserCredentials;
}

export namespace UserCredentials {
    export type AsObject = {
        username: string,
        password: string,
    }
}

export class AccountInfo extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getUsername(): string;
    setUsername(value: string): void;

    getCreatedat(): string;
    setCreatedat(value: string): void;

    getUpdatedat(): string;
    setUpdatedat(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountInfo.AsObject;
    static toObject(includeInstance: boolean, msg: AccountInfo): AccountInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountInfo;
    static deserializeBinaryFromReader(message: AccountInfo, reader: jspb.BinaryReader): AccountInfo;
}

export namespace AccountInfo {
    export type AsObject = {
        id: string,
        username: string,
        createdat: string,
        updatedat: string,
    }
}

export class JWTTokens extends jspb.Message { 
    getAccesstoken(): string;
    setAccesstoken(value: string): void;

    getRefreshtoken(): string;
    setRefreshtoken(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): JWTTokens.AsObject;
    static toObject(includeInstance: boolean, msg: JWTTokens): JWTTokens.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: JWTTokens, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): JWTTokens;
    static deserializeBinaryFromReader(message: JWTTokens, reader: jspb.BinaryReader): JWTTokens;
}

export namespace JWTTokens {
    export type AsObject = {
        accesstoken: string,
        refreshtoken: string,
    }
}

export class RenewRequest extends jspb.Message { 
    getRefreshtoken(): string;
    setRefreshtoken(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RenewRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RenewRequest): RenewRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RenewRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RenewRequest;
    static deserializeBinaryFromReader(message: RenewRequest, reader: jspb.BinaryReader): RenewRequest;
}

export namespace RenewRequest {
    export type AsObject = {
        refreshtoken: string,
    }
}

export class AccountRequest extends jspb.Message { 
    getAccesstoken(): string;
    setAccesstoken(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AccountRequest): AccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountRequest;
    static deserializeBinaryFromReader(message: AccountRequest, reader: jspb.BinaryReader): AccountRequest;
}

export namespace AccountRequest {
    export type AsObject = {
        accesstoken: string,
    }
}
