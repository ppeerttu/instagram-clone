import { GrpcClient } from "../GrpcClient";
import { CommentService } from "./CommentService";
import { config } from "../../config/grpc";
import { CommentsClient } from "../generated/comment_service_grpc_pb";
import { credentials } from "grpc";
import { CreateCommentRequest, GetCommentRequest, DeleteCommentRequest, GetCommentsByTagRequest, GetCommentsByUserTagRequest } from "../generated/comment_service_pb";
import { CreateCommentError } from "./errors/CreateCommentError";
import { mapComment, CommentWrapper } from "../models";
import { GetCommentError } from "./errors/GetCommentError";
import { resolve, promises } from "dns";
import { DeleteCommentError } from "./errors/DeleteCommentError";
import { GetCommentsByTagError } from "./errors/GetCommentsByTagError";
import { GetCommentsByUserTagError } from "./errors/GetCommentsByUserTagError";

export class CommentServiceClient extends GrpcClient implements CommentService {

    protected serviceName: string = config.commentService

    private client: CommentsClient | null = null;

    protected updateClient() {
        const endpoint = this.getNewEndpoint();
        if (!endpoint) {
            this.currentEndpoint = null;
            this.client = null;
            return;
        }
        if (endpoint === this.currentEndpoint && this.client) {
            return;
        }
        this.client = new CommentsClient(
            endpoint,
            credentials.createInsecure(),
        );
        this.currentEndpoint = endpoint;
        return;
    }

    protected getClient(): CommentsClient {
        this.updateClient();
        const client = this.client;
        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }
        return client;
    }

    createComment = async (
        content: string,
        userId: string,
        imageId: string,
        tags: string[],
        userTags: string[]
    ) => {
        const client = this.getClient();
        const request = new CreateCommentRequest();
        request.setComment(content);
        request.setImageId(imageId);
        request.setUserId(userId);
        request.setTagsList(tags);
        request.setUserTagsList(userTags);

        const promise = new Promise<CommentWrapper>((resolve, reject) => {
            client.createComment(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const e = response.getError();
                const comment = response.getComment();

                if (!comment ||e) {
                    return reject (
                            new CreateCommentError("Create comment failed", e || null)
                        );
                }
                return resolve(mapComment(comment));
            })
        });

        return promise;
    }

    getComment = (id: string) => {
        const client = this.getClient();
        const request = new GetCommentRequest();
        request.setCommentid(id);
        const promise = new Promise<CommentWrapper>((resolve, reject) => {
            client.getComment(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const e = response.getError();
                const comment = response.getComment();

                if (!comment || e) {
                    return reject(
                        new GetCommentError("Get comment failed", e || null)
                    );
                }
                return resolve(mapComment(comment));
            });
        });

        return promise;
    }

    deleteComment = (id: string) => {
        const client = this.getClient();
        const request = new DeleteCommentRequest();
        request.setCommentid(id);
        const promise = new Promise<string>((resolve, reject) => {
            client.deleteComment(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const e = response.getError();
                const deletedId = response.getCommentid();
                if (!deletedId || e) {
                    return reject(
                        new DeleteCommentError("Delete comment failed", e || null)
                    );
                }
                return resolve(deletedId);
            });
        })
        return promise;
    }

    getCommentsByHashTag = (hashTag: string) => {
        const client = this.getClient();
        const request = new GetCommentsByTagRequest();
        request.setTag(hashTag);
        const promise = new Promise<CommentWrapper[]>((resolve, reject) => {
            client.getCommentsByTag(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const e = response.getError();
                const comments = response.getComments();
                if (!comments || e) {
                    return reject(
                        new GetCommentsByTagError("Get Comments by tag failed", e || null)
                    );
                }
                return resolve(comments.getCommentsList().map((i) => mapComment(i)));
            });
        });
        return promise;
    }

    getCommentsByUserTag = (userTag: string) => {
        const client = this.getClient();
        const request = new GetCommentsByUserTagRequest();
        request.setTag(userTag);
        const promise = new Promise<CommentWrapper[]>((resolve, reject) => {
            client.getCommentsByUserTag(request, (error, response) => {
                if (error) {
                    return reject(error);
                }
                const e = response.getError();
                const comments = response.getComments();
                if (!comments || e) {
                    return reject(
                        new GetCommentsByUserTagError(
                            "Get Comments by tag failed", e || null)
                    );
                }
                return resolve(comments.getCommentsList().map((i) => mapComment(i)));
            });
        });
        return promise;
    }
}