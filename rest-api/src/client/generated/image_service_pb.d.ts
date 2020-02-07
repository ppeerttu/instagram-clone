// package: Image
// file: image_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateImageRequest extends jspb.Message { 

    hasMetaData(): boolean;
    clearMetaData(): void;
    getMetaData(): Metadata | undefined;
    setMetaData(value?: Metadata): void;


    hasData(): boolean;
    clearData(): void;
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;


    getPartCase(): CreateImageRequest.PartCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateImageRequest): CreateImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateImageRequest;
    static deserializeBinaryFromReader(message: CreateImageRequest, reader: jspb.BinaryReader): CreateImageRequest;
}

export namespace CreateImageRequest {
    export type AsObject = {
        metaData?: Metadata.AsObject,
        data: Uint8Array | string,
    }

    export enum PartCase {
        PART_NOT_SET = 0,
    
    META_DATA = 1,

    DATA = 2,

    }

}

export class Metadata extends jspb.Message { 
    getCaption(): string;
    setCaption(value: string): void;

    getCreatorId(): string;
    setCreatorId(value: string): void;

    getImageType(): ImageType;
    setImageType(value: ImageType): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
    export type AsObject = {
        caption: string,
        creatorId: string,
        imageType: ImageType,
    }
}

export class CreateImageResponse extends jspb.Message { 

    hasImage(): boolean;
    clearImage(): void;
    getImage(): Image | undefined;
    setImage(value?: Image): void;


    hasError(): boolean;
    clearError(): void;
    getError(): CreateImageErrorStatus;
    setError(value: CreateImageErrorStatus): void;


    getStatusCase(): CreateImageResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateImageResponse): CreateImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateImageResponse;
    static deserializeBinaryFromReader(message: CreateImageResponse, reader: jspb.BinaryReader): CreateImageResponse;
}

export namespace CreateImageResponse {
    export type AsObject = {
        image?: Image.AsObject,
        error: CreateImageErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    IMAGE = 1,

    ERROR = 2,

    }

}

export class DeleteImageRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteImageRequest): DeleteImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteImageRequest;
    static deserializeBinaryFromReader(message: DeleteImageRequest, reader: jspb.BinaryReader): DeleteImageRequest;
}

export namespace DeleteImageRequest {
    export type AsObject = {
        id: string,
    }
}

export class DeleteImageResponse extends jspb.Message { 
    getStatus(): DeleteImageStatus;
    setStatus(value: DeleteImageStatus): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteImageResponse): DeleteImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteImageResponse;
    static deserializeBinaryFromReader(message: DeleteImageResponse, reader: jspb.BinaryReader): DeleteImageResponse;
}

export namespace DeleteImageResponse {
    export type AsObject = {
        status: DeleteImageStatus,
    }
}

export class GetImageRequest extends jspb.Message { 
    getImageId(): string;
    setImageId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetImageRequest): GetImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetImageRequest;
    static deserializeBinaryFromReader(message: GetImageRequest, reader: jspb.BinaryReader): GetImageRequest;
}

export namespace GetImageRequest {
    export type AsObject = {
        imageId: string,
    }
}

export class GetImageResponse extends jspb.Message { 

    hasImage(): boolean;
    clearImage(): void;
    getImage(): Image | undefined;
    setImage(value?: Image): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetImageErrorStatus;
    setError(value: GetImageErrorStatus): void;


    getStatusCase(): GetImageResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetImageResponse): GetImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetImageResponse;
    static deserializeBinaryFromReader(message: GetImageResponse, reader: jspb.BinaryReader): GetImageResponse;
}

export namespace GetImageResponse {
    export type AsObject = {
        image?: Image.AsObject,
        error: GetImageErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    IMAGE = 1,

    ERROR = 2,

    }

}

export class GetImageDataRequest extends jspb.Message { 
    getImageId(): string;
    setImageId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetImageDataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetImageDataRequest): GetImageDataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetImageDataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetImageDataRequest;
    static deserializeBinaryFromReader(message: GetImageDataRequest, reader: jspb.BinaryReader): GetImageDataRequest;
}

export namespace GetImageDataRequest {
    export type AsObject = {
        imageId: string,
    }
}

export class GetImageDataResponse extends jspb.Message { 

    hasData(): boolean;
    clearData(): void;
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetImageErrorStatus;
    setError(value: GetImageErrorStatus): void;


    getStatusCase(): GetImageDataResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetImageDataResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetImageDataResponse): GetImageDataResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetImageDataResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetImageDataResponse;
    static deserializeBinaryFromReader(message: GetImageDataResponse, reader: jspb.BinaryReader): GetImageDataResponse;
}

export namespace GetImageDataResponse {
    export type AsObject = {
        data: Uint8Array | string,
        error: GetImageErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    DATA = 1,

    ERROR = 2,

    }

}

export class GetUserImagesRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserImagesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserImagesRequest): GetUserImagesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserImagesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserImagesRequest;
    static deserializeBinaryFromReader(message: GetUserImagesRequest, reader: jspb.BinaryReader): GetUserImagesRequest;
}

export namespace GetUserImagesRequest {
    export type AsObject = {
        userId: string,
    }
}

export class GetUserImagesResponse extends jspb.Message { 

    hasPage(): boolean;
    clearPage(): void;
    getPage(): UserImagePage | undefined;
    setPage(value?: UserImagePage): void;


    hasError(): boolean;
    clearError(): void;
    getError(): GetUserImagesErrorStatus;
    setError(value: GetUserImagesErrorStatus): void;


    getStatusCase(): GetUserImagesResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserImagesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserImagesResponse): GetUserImagesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserImagesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserImagesResponse;
    static deserializeBinaryFromReader(message: GetUserImagesResponse, reader: jspb.BinaryReader): GetUserImagesResponse;
}

export namespace GetUserImagesResponse {
    export type AsObject = {
        page?: UserImagePage.AsObject,
        error: GetUserImagesErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    PAGE = 1,

    ERROR = 2,

    }

}

export class SearchImagesRequest extends jspb.Message { 

    hasHashTag(): boolean;
    clearHashTag(): void;
    getHashTag(): string;
    setHashTag(value: string): void;


    hasUserTag(): boolean;
    clearUserTag(): void;
    getUserTag(): string;
    setUserTag(value: string): void;


    getSearchCase(): SearchImagesRequest.SearchCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchImagesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SearchImagesRequest): SearchImagesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchImagesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchImagesRequest;
    static deserializeBinaryFromReader(message: SearchImagesRequest, reader: jspb.BinaryReader): SearchImagesRequest;
}

export namespace SearchImagesRequest {
    export type AsObject = {
        hashTag: string,
        userTag: string,
    }

    export enum SearchCase {
        SEARCH_NOT_SET = 0,
    
    HASH_TAG = 1,

    USER_TAG = 2,

    }

}

export class SearchImagesResponse extends jspb.Message { 

    hasPage(): boolean;
    clearPage(): void;
    getPage(): ImageSearchPage | undefined;
    setPage(value?: ImageSearchPage): void;


    hasError(): boolean;
    clearError(): void;
    getError(): SearchImagesErrorStatus;
    setError(value: SearchImagesErrorStatus): void;


    getStatusCase(): SearchImagesResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchImagesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SearchImagesResponse): SearchImagesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchImagesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchImagesResponse;
    static deserializeBinaryFromReader(message: SearchImagesResponse, reader: jspb.BinaryReader): SearchImagesResponse;
}

export namespace SearchImagesResponse {
    export type AsObject = {
        page?: ImageSearchPage.AsObject,
        error: SearchImagesErrorStatus,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    PAGE = 1,

    ERROR = 2,

    }

}

export class ImageSearchPage extends jspb.Message { 

    hasHashTag(): boolean;
    clearHashTag(): void;
    getHashTag(): string;
    setHashTag(value: string): void;


    hasUserTag(): boolean;
    clearUserTag(): void;
    getUserTag(): string;
    setUserTag(value: string): void;

    getSize(): number;
    setSize(value: number): void;

    getPage(): number;
    setPage(value: number): void;

    getTotalCount(): number;
    setTotalCount(value: number): void;

    clearImagesList(): void;
    getImagesList(): Array<Image>;
    setImagesList(value: Array<Image>): void;
    addImages(value?: Image, index?: number): Image;


    getSearchCase(): ImageSearchPage.SearchCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageSearchPage.AsObject;
    static toObject(includeInstance: boolean, msg: ImageSearchPage): ImageSearchPage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageSearchPage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageSearchPage;
    static deserializeBinaryFromReader(message: ImageSearchPage, reader: jspb.BinaryReader): ImageSearchPage;
}

export namespace ImageSearchPage {
    export type AsObject = {
        hashTag: string,
        userTag: string,
        size: number,
        page: number,
        totalCount: number,
        imagesList: Array<Image.AsObject>,
    }

    export enum SearchCase {
        SEARCH_NOT_SET = 0,
    
    HASH_TAG = 1,

    USER_TAG = 2,

    }

}

export class UserImagePage extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): void;

    getSize(): number;
    setSize(value: number): void;

    getPage(): number;
    setPage(value: number): void;

    getTotalCount(): number;
    setTotalCount(value: number): void;

    clearImagesList(): void;
    getImagesList(): Array<Image>;
    setImagesList(value: Array<Image>): void;
    addImages(value?: Image, index?: number): Image;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserImagePage.AsObject;
    static toObject(includeInstance: boolean, msg: UserImagePage): UserImagePage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserImagePage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserImagePage;
    static deserializeBinaryFromReader(message: UserImagePage, reader: jspb.BinaryReader): UserImagePage;
}

export namespace UserImagePage {
    export type AsObject = {
        userId: string,
        size: number,
        page: number,
        totalCount: number,
        imagesList: Array<Image.AsObject>,
    }
}

export class Image extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getMimeType(): string;
    setMimeType(value: string): void;

    getWidth(): number;
    setWidth(value: number): void;

    getHeight(): number;
    setHeight(value: number): void;

    getUserId(): string;
    setUserId(value: string): void;

    getCaption(): string;
    setCaption(value: string): void;

    getCreatedAt(): string;
    setCreatedAt(value: string): void;

    clearUserTagsList(): void;
    getUserTagsList(): Array<string>;
    setUserTagsList(value: Array<string>): void;
    addUserTags(value: string, index?: number): string;

    clearHashTagsList(): void;
    getHashTagsList(): Array<string>;
    setHashTagsList(value: Array<string>): void;
    addHashTags(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Image.AsObject;
    static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Image;
    static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
    export type AsObject = {
        id: string,
        mimeType: string,
        width: number,
        height: number,
        userId: string,
        caption: string,
        createdAt: string,
        userTagsList: Array<string>,
        hashTagsList: Array<string>,
    }
}

export enum ImageType {
    PNG = 0,
    JPG = 1,
}

export enum CreateImageErrorStatus {
    CREATE_IMAGE_SERVER_ERROR = 0,
    CONTENT_TOO_LONG = 1,
    CREATOR_NOT_FOUND = 2,
    INVALID_DATA = 3,
    CAPTION_TOO_LONG = 4,
}

export enum DeleteImageStatus {
    DELETE_IMAGE_SERVER_ERROR = 0,
    DELETABLE_NOT_FOUND = 1,
    OK = 2,
}

export enum GetImageErrorStatus {
    GET_IMAGE_SERVER_ERROR = 0,
    IMAGE_NOT_FOUND = 1,
}

export enum GetUserImagesErrorStatus {
    GET_USER_IMAGES_SERVER_ERROR = 0,
    USER_NOT_FOUND = 1,
}

export enum SearchImagesErrorStatus {
    SEARCH_IMAGES_SERVER_ERROR = 0,
    EMPTY_SEARCH = 1,
}
