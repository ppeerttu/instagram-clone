// package: Comment
// file: comment_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as comment_service_pb from "./comment_service_pb";

interface ICommentsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createComment: ICommentsService_ICreateComment;
    getComment: ICommentsService_IGetComment;
    deleteComment: ICommentsService_IDeleteComment;
    getCommentsByTag: ICommentsService_IGetCommentsByTag;
    getCommentsByUserTag: ICommentsService_IGetCommentsByUserTag;
}

interface ICommentsService_ICreateComment extends grpc.MethodDefinition<comment_service_pb.CreateCommentRequest, comment_service_pb.CreateCommentResponse> {
    path: string; // "/Comment.Comments/CreateComment"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<comment_service_pb.CreateCommentRequest>;
    requestDeserialize: grpc.deserialize<comment_service_pb.CreateCommentRequest>;
    responseSerialize: grpc.serialize<comment_service_pb.CreateCommentResponse>;
    responseDeserialize: grpc.deserialize<comment_service_pb.CreateCommentResponse>;
}
interface ICommentsService_IGetComment extends grpc.MethodDefinition<comment_service_pb.GetCommentRequest, comment_service_pb.GetCommentResponse> {
    path: string; // "/Comment.Comments/GetComment"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<comment_service_pb.GetCommentRequest>;
    requestDeserialize: grpc.deserialize<comment_service_pb.GetCommentRequest>;
    responseSerialize: grpc.serialize<comment_service_pb.GetCommentResponse>;
    responseDeserialize: grpc.deserialize<comment_service_pb.GetCommentResponse>;
}
interface ICommentsService_IDeleteComment extends grpc.MethodDefinition<comment_service_pb.DeleteCommentRequest, comment_service_pb.DeleteCommentResponse> {
    path: string; // "/Comment.Comments/DeleteComment"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<comment_service_pb.DeleteCommentRequest>;
    requestDeserialize: grpc.deserialize<comment_service_pb.DeleteCommentRequest>;
    responseSerialize: grpc.serialize<comment_service_pb.DeleteCommentResponse>;
    responseDeserialize: grpc.deserialize<comment_service_pb.DeleteCommentResponse>;
}
interface ICommentsService_IGetCommentsByTag extends grpc.MethodDefinition<comment_service_pb.GetCommentsByTagRequest, comment_service_pb.GetCommentsByTagResponse> {
    path: string; // "/Comment.Comments/GetCommentsByTag"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<comment_service_pb.GetCommentsByTagRequest>;
    requestDeserialize: grpc.deserialize<comment_service_pb.GetCommentsByTagRequest>;
    responseSerialize: grpc.serialize<comment_service_pb.GetCommentsByTagResponse>;
    responseDeserialize: grpc.deserialize<comment_service_pb.GetCommentsByTagResponse>;
}
interface ICommentsService_IGetCommentsByUserTag extends grpc.MethodDefinition<comment_service_pb.GetCommentsByUserTagRequest, comment_service_pb.GetCommentsByUserTagResponse> {
    path: string; // "/Comment.Comments/GetCommentsByUserTag"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<comment_service_pb.GetCommentsByUserTagRequest>;
    requestDeserialize: grpc.deserialize<comment_service_pb.GetCommentsByUserTagRequest>;
    responseSerialize: grpc.serialize<comment_service_pb.GetCommentsByUserTagResponse>;
    responseDeserialize: grpc.deserialize<comment_service_pb.GetCommentsByUserTagResponse>;
}

export const CommentsService: ICommentsService;

export interface ICommentsServer {
    createComment: grpc.handleUnaryCall<comment_service_pb.CreateCommentRequest, comment_service_pb.CreateCommentResponse>;
    getComment: grpc.handleUnaryCall<comment_service_pb.GetCommentRequest, comment_service_pb.GetCommentResponse>;
    deleteComment: grpc.handleUnaryCall<comment_service_pb.DeleteCommentRequest, comment_service_pb.DeleteCommentResponse>;
    getCommentsByTag: grpc.handleUnaryCall<comment_service_pb.GetCommentsByTagRequest, comment_service_pb.GetCommentsByTagResponse>;
    getCommentsByUserTag: grpc.handleUnaryCall<comment_service_pb.GetCommentsByUserTagRequest, comment_service_pb.GetCommentsByUserTagResponse>;
}

export interface ICommentsClient {
    createComment(request: comment_service_pb.CreateCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    createComment(request: comment_service_pb.CreateCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    createComment(request: comment_service_pb.CreateCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    getComment(request: comment_service_pb.GetCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    getComment(request: comment_service_pb.GetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    getComment(request: comment_service_pb.GetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    deleteComment(request: comment_service_pb.DeleteCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    deleteComment(request: comment_service_pb.DeleteCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    deleteComment(request: comment_service_pb.DeleteCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
    getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
    getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
}

export class CommentsClient extends grpc.Client implements ICommentsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createComment(request: comment_service_pb.CreateCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    public createComment(request: comment_service_pb.CreateCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    public createComment(request: comment_service_pb.CreateCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.CreateCommentResponse) => void): grpc.ClientUnaryCall;
    public getComment(request: comment_service_pb.GetCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    public getComment(request: comment_service_pb.GetCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    public getComment(request: comment_service_pb.GetCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteComment(request: comment_service_pb.DeleteCommentRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteComment(request: comment_service_pb.DeleteCommentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    public deleteComment(request: comment_service_pb.DeleteCommentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.DeleteCommentResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByTag(request: comment_service_pb.GetCommentsByTagRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByTagResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
    public getCommentsByUserTag(request: comment_service_pb.GetCommentsByUserTagRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: comment_service_pb.GetCommentsByUserTagResponse) => void): grpc.ClientUnaryCall;
}
