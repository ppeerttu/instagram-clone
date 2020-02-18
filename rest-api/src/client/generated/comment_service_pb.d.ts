// package: Comment
// file: comment_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateCommentRequest extends jspb.Message { 
    getComment(): string;
    setComment(value: string): void;

    getUserId(): string;
    setUserId(value: string): void;

    getImageId(): string;
    setImageId(value: string): void;

    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): void;
    addTags(value: string, index?: number): string;

    clearUserTagsList(): void;
    getUserTagsList(): Array<string>;
    setUserTagsList(value: Array<string>): void;
    addUserTags(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateCommentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateCommentRequest): CreateCommentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateCommentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateCommentRequest;
    static deserializeBinaryFromReader(message: CreateCommentRequest, reader: jspb.BinaryReader): CreateCommentRequest;
}

export namespace CreateCommentRequest {
    export type AsObject = {
        comment: string,
        userId: string,
        imageId: string,
        tagsList: Array<string>,
        userTagsList: Array<string>,
    }
}

export class CreateCommentResponse extends jspb.Message { 

    hasComment(): boolean;
    clearComment(): void;
    getComment(): Comment | undefined;
    setComment(value?: Comment): void;


    hasError(): boolean;
    clearError(): void;
    getError(): CreateCommentErrorStatus;
    setError(value: CreateCommentErrorStatus): void;


    getStatusCase(): CreateCommentResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateCommentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateCommentResponse): CreateCommentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateCommentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateCommentResponse;
    static deserializeBinaryFromReader(message: CreateCommentResponse, reader: jspb.BinaryReader): CreateCommentResponse;
}

export namespace CreateCommentResponse {
    export type AsObject = {
        comment?: Comment.AsObject,
        error: CreateCommentErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    COMMENT = 1,

    ERROR = 2,

    }

}

export class GetCommentRequest extends jspb.Message { 
    getCommentid(): string;
    setCommentid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentRequest): GetCommentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentRequest;
    static deserializeBinaryFromReader(message: GetCommentRequest, reader: jspb.BinaryReader): GetCommentRequest;
}

export namespace GetCommentRequest {
    export type AsObject = {
        commentid: string,
    }
}

export class GetCommentResponse extends jspb.Message { 

    hasComment(): boolean;
    clearComment(): void;
    getComment(): Comment | undefined;
    setComment(value?: Comment): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetCommentErrorStatus;
    setError(value: GetCommentErrorStatus): void;


    getStatusCase(): GetCommentResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentResponse): GetCommentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentResponse;
    static deserializeBinaryFromReader(message: GetCommentResponse, reader: jspb.BinaryReader): GetCommentResponse;
}

export namespace GetCommentResponse {
    export type AsObject = {
        comment?: Comment.AsObject,
        error: GetCommentErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    COMMENT = 1,

    ERROR = 2,

    }

}

export class DeleteCommentRequest extends jspb.Message { 
    getCommentid(): string;
    setCommentid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteCommentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteCommentRequest): DeleteCommentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteCommentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteCommentRequest;
    static deserializeBinaryFromReader(message: DeleteCommentRequest, reader: jspb.BinaryReader): DeleteCommentRequest;
}

export namespace DeleteCommentRequest {
    export type AsObject = {
        commentid: string,
    }
}

export class DeleteCommentResponse extends jspb.Message { 

    hasCommentid(): boolean;
    clearCommentid(): void;
    getCommentid(): string;
    setCommentid(value: string): void;


    hasError(): boolean;
    clearError(): void;
    getError(): DeleteCommentErrorStatus;
    setError(value: DeleteCommentErrorStatus): void;


    getStatusCase(): DeleteCommentResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteCommentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteCommentResponse): DeleteCommentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteCommentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteCommentResponse;
    static deserializeBinaryFromReader(message: DeleteCommentResponse, reader: jspb.BinaryReader): DeleteCommentResponse;
}

export namespace DeleteCommentResponse {
    export type AsObject = {
        commentid: string,
        error: DeleteCommentErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    COMMENTID = 1,

    ERROR = 2,

    }

}

export class GetCommentsByTagRequest extends jspb.Message { 
    getTag(): string;
    setTag(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentsByTagRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentsByTagRequest): GetCommentsByTagRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentsByTagRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentsByTagRequest;
    static deserializeBinaryFromReader(message: GetCommentsByTagRequest, reader: jspb.BinaryReader): GetCommentsByTagRequest;
}

export namespace GetCommentsByTagRequest {
    export type AsObject = {
        tag: string,
    }
}

export class GetCommentsByTagResponse extends jspb.Message { 

    hasComments(): boolean;
    clearComments(): void;
    getComments(): CommentList | undefined;
    setComments(value?: CommentList): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetCommentsByTagErrorStatus;
    setError(value: GetCommentsByTagErrorStatus): void;


    getStatusCase(): GetCommentsByTagResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentsByTagResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentsByTagResponse): GetCommentsByTagResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentsByTagResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentsByTagResponse;
    static deserializeBinaryFromReader(message: GetCommentsByTagResponse, reader: jspb.BinaryReader): GetCommentsByTagResponse;
}

export namespace GetCommentsByTagResponse {
    export type AsObject = {
        comments?: CommentList.AsObject,
        error: GetCommentsByTagErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    COMMENTS = 1,

    ERROR = 2,

    }

}

export class CommentList extends jspb.Message { 
    clearCommentsList(): void;
    getCommentsList(): Array<Comment>;
    setCommentsList(value: Array<Comment>): void;
    addComments(value?: Comment, index?: number): Comment;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommentList.AsObject;
    static toObject(includeInstance: boolean, msg: CommentList): CommentList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommentList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommentList;
    static deserializeBinaryFromReader(message: CommentList, reader: jspb.BinaryReader): CommentList;
}

export namespace CommentList {
    export type AsObject = {
        commentsList: Array<Comment.AsObject>,
    }
}

export class GetCommentsByUserTagRequest extends jspb.Message { 
    getTag(): string;
    setTag(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentsByUserTagRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentsByUserTagRequest): GetCommentsByUserTagRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentsByUserTagRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentsByUserTagRequest;
    static deserializeBinaryFromReader(message: GetCommentsByUserTagRequest, reader: jspb.BinaryReader): GetCommentsByUserTagRequest;
}

export namespace GetCommentsByUserTagRequest {
    export type AsObject = {
        tag: string,
    }
}

export class GetCommentsByUserTagResponse extends jspb.Message { 

    hasComments(): boolean;
    clearComments(): void;
    getComments(): CommentList | undefined;
    setComments(value?: CommentList): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetCommentsByUserTagErrorStatus;
    setError(value: GetCommentsByUserTagErrorStatus): void;


    getStatusCase(): GetCommentsByUserTagResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCommentsByUserTagResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCommentsByUserTagResponse): GetCommentsByUserTagResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCommentsByUserTagResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCommentsByUserTagResponse;
    static deserializeBinaryFromReader(message: GetCommentsByUserTagResponse, reader: jspb.BinaryReader): GetCommentsByUserTagResponse;
}

export namespace GetCommentsByUserTagResponse {
    export type AsObject = {
        comments?: CommentList.AsObject,
        error: GetCommentsByUserTagErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    COMMENTS = 1,

    ERROR = 2,

    }

}

export class Comment extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getContent(): string;
    setContent(value: string): void;

    getUserId(): string;
    setUserId(value: string): void;

    getImageId(): string;
    setImageId(value: string): void;

    getCreatedAt(): string;
    setCreatedAt(value: string): void;

    clearTagsList(): void;
    getTagsList(): Array<string>;
    setTagsList(value: Array<string>): void;
    addTags(value: string, index?: number): string;

    clearUsertagsList(): void;
    getUsertagsList(): Array<string>;
    setUsertagsList(value: Array<string>): void;
    addUsertags(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Comment.AsObject;
    static toObject(includeInstance: boolean, msg: Comment): Comment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Comment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Comment;
    static deserializeBinaryFromReader(message: Comment, reader: jspb.BinaryReader): Comment;
}

export namespace Comment {
    export type AsObject = {
        id: string,
        content: string,
        userId: string,
        imageId: string,
        createdAt: string,
        tagsList: Array<string>,
        usertagsList: Array<string>,
    }
}

export enum GetCommentsByTagErrorStatus {
    GET_BY_TAG_SERVER_ERROR = 0,
}

export enum GetCommentsByUserTagErrorStatus {
    GET_BY_USER_TAG_SERVER_ERROR = 0,
}

export enum DeleteCommentErrorStatus {
    DELETE_NOT_FOUND = 0,
    DELETE_SERVER_ERROR = 1,
}

export enum CreateCommentErrorStatus {
    CREATE_SERVER_ERROR = 0,
    CREATE_INVALID_PARAMETER = 1,
}

export enum GetCommentErrorStatus {
    GET_SERVER_ERROR = 0,
    GET_NOT_FOUND = 1,
}
