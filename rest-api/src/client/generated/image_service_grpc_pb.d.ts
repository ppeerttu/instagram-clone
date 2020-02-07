// package: Image
// file: image_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as image_service_pb from "./image_service_pb";

interface IImagesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createImage: IImagesService_ICreateImage;
    deleteImage: IImagesService_IDeleteImage;
    getImage: IImagesService_IGetImage;
    getImageData: IImagesService_IGetImageData;
    getUserImages: IImagesService_IGetUserImages;
    searchImages: IImagesService_ISearchImages;
}

interface IImagesService_ICreateImage extends grpc.MethodDefinition<image_service_pb.CreateImageRequest, image_service_pb.CreateImageResponse> {
    path: string; // "/Image.Images/CreateImage"
    requestStream: boolean; // true
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.CreateImageRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.CreateImageRequest>;
    responseSerialize: grpc.serialize<image_service_pb.CreateImageResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.CreateImageResponse>;
}
interface IImagesService_IDeleteImage extends grpc.MethodDefinition<image_service_pb.DeleteImageRequest, image_service_pb.DeleteImageResponse> {
    path: string; // "/Image.Images/DeleteImage"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.DeleteImageRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.DeleteImageRequest>;
    responseSerialize: grpc.serialize<image_service_pb.DeleteImageResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.DeleteImageResponse>;
}
interface IImagesService_IGetImage extends grpc.MethodDefinition<image_service_pb.GetImageRequest, image_service_pb.GetImageResponse> {
    path: string; // "/Image.Images/GetImage"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.GetImageRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.GetImageRequest>;
    responseSerialize: grpc.serialize<image_service_pb.GetImageResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.GetImageResponse>;
}
interface IImagesService_IGetImageData extends grpc.MethodDefinition<image_service_pb.GetImageDataRequest, image_service_pb.GetImageDataResponse> {
    path: string; // "/Image.Images/GetImageData"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.GetImageDataRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.GetImageDataRequest>;
    responseSerialize: grpc.serialize<image_service_pb.GetImageDataResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.GetImageDataResponse>;
}
interface IImagesService_IGetUserImages extends grpc.MethodDefinition<image_service_pb.GetUserImagesRequest, image_service_pb.GetUserImagesResponse> {
    path: string; // "/Image.Images/GetUserImages"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.GetUserImagesRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.GetUserImagesRequest>;
    responseSerialize: grpc.serialize<image_service_pb.GetUserImagesResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.GetUserImagesResponse>;
}
interface IImagesService_ISearchImages extends grpc.MethodDefinition<image_service_pb.SearchImagesRequest, image_service_pb.SearchImagesResponse> {
    path: string; // "/Image.Images/SearchImages"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_service_pb.SearchImagesRequest>;
    requestDeserialize: grpc.deserialize<image_service_pb.SearchImagesRequest>;
    responseSerialize: grpc.serialize<image_service_pb.SearchImagesResponse>;
    responseDeserialize: grpc.deserialize<image_service_pb.SearchImagesResponse>;
}

export const ImagesService: IImagesService;

export interface IImagesServer {
    createImage: grpc.handleClientStreamingCall<image_service_pb.CreateImageRequest, image_service_pb.CreateImageResponse>;
    deleteImage: grpc.handleUnaryCall<image_service_pb.DeleteImageRequest, image_service_pb.DeleteImageResponse>;
    getImage: grpc.handleUnaryCall<image_service_pb.GetImageRequest, image_service_pb.GetImageResponse>;
    getImageData: grpc.handleUnaryCall<image_service_pb.GetImageDataRequest, image_service_pb.GetImageDataResponse>;
    getUserImages: grpc.handleUnaryCall<image_service_pb.GetUserImagesRequest, image_service_pb.GetUserImagesResponse>;
    searchImages: grpc.handleUnaryCall<image_service_pb.SearchImagesRequest, image_service_pb.SearchImagesResponse>;
}

export interface IImagesClient {
    createImage(callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    createImage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    createImage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    createImage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    deleteImage(request: image_service_pb.DeleteImageRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    deleteImage(request: image_service_pb.DeleteImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    deleteImage(request: image_service_pb.DeleteImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    getImage(request: image_service_pb.GetImageRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    getImage(request: image_service_pb.GetImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    getImage(request: image_service_pb.GetImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    getImageData(request: image_service_pb.GetImageDataRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    getImageData(request: image_service_pb.GetImageDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    getImageData(request: image_service_pb.GetImageDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    getUserImages(request: image_service_pb.GetUserImagesRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    getUserImages(request: image_service_pb.GetUserImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    getUserImages(request: image_service_pb.GetUserImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    searchImages(request: image_service_pb.SearchImagesRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
    searchImages(request: image_service_pb.SearchImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
    searchImages(request: image_service_pb.SearchImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
}

export class ImagesClient extends grpc.Client implements IImagesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createImage(callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    public createImage(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    public createImage(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    public createImage(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.CreateImageResponse) => void): grpc.ClientWritableStream<image_service_pb.CreateImageRequest>;
    public deleteImage(request: image_service_pb.DeleteImageRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    public deleteImage(request: image_service_pb.DeleteImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    public deleteImage(request: image_service_pb.DeleteImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.DeleteImageResponse) => void): grpc.ClientUnaryCall;
    public getImage(request: image_service_pb.GetImageRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    public getImage(request: image_service_pb.GetImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    public getImage(request: image_service_pb.GetImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageResponse) => void): grpc.ClientUnaryCall;
    public getImageData(request: image_service_pb.GetImageDataRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    public getImageData(request: image_service_pb.GetImageDataRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    public getImageData(request: image_service_pb.GetImageDataRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetImageDataResponse) => void): grpc.ClientUnaryCall;
    public getUserImages(request: image_service_pb.GetUserImagesRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    public getUserImages(request: image_service_pb.GetUserImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    public getUserImages(request: image_service_pb.GetUserImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.GetUserImagesResponse) => void): grpc.ClientUnaryCall;
    public searchImages(request: image_service_pb.SearchImagesRequest, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
    public searchImages(request: image_service_pb.SearchImagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
    public searchImages(request: image_service_pb.SearchImagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_service_pb.SearchImagesResponse) => void): grpc.ClientUnaryCall;
}
