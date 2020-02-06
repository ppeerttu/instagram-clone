import { credentials } from "grpc";

import { GrpcClient } from "../GrpcClient";
import { ImageMeta, metaFromImage } from "../models";
import { ImageService } from "./ImageService";
import { config } from "../../config/grpc";
import { ImagesClient } from "../generated/image_service_grpc_pb";
import {
    CreateImageRequest,
    GetImageRequest,
    GetImageErrorStatus,
    GetImageDataRequest,
    DeleteImageRequest,
    DeleteImageStatus,
} from "../generated/image_service_pb";
import { CreateImageError, GetImageError, DeleteImageError } from "./errors";


export class ImageServiceClient extends GrpcClient implements ImageService {

    protected serviceName: string = config.imageService;

    private client: ImagesClient | null = null;

    protected updateClient() {
        // Pick new remote endpoint for gRPC client
        const endpoint = this.getNewEndpoint();
        if (!endpoint) {
            this.currentEndpoint = null;
            this.client = null;
            return;
        }
        // We should already have this endpoint assigned to the client
        if (endpoint === this.currentEndpoint && this.client) {
            return;
        }
        this.client = new ImagesClient(
            endpoint,
            credentials.createInsecure(),
        );
        this.currentEndpoint = endpoint;
        return;
    }

    /**
     * Get the client instance in secure way.
     *
     * @throws {Error} No known gRPC endpoints available
     */
    protected getClient(): ImagesClient {
        this.updateClient();
        const client = this.client;
        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }
        return client;
    }

    createImage = async (caption: string, userId: string, data: string | Uint8Array) => {
        const client = this.getClient();
        const req = new CreateImageRequest();
        req.setCaption(caption);
        req.setCreatorId(userId);
        req.setData(data);

        return new Promise<ImageMeta>((resolve, reject) => {
            client.createImage(req, (e, response) => {
                if (e) {
                    return reject(e);
                }
                const error = response.getError();
                const image = response.getImage();

                if (!image || error) {
                    return reject(
                        new CreateImageError("Image creation failed", error || null)
                    );
                }
                return resolve(metaFromImage(image));
            });
        });
    }

    getImageMeta = async (imageId: string) => {
        const client = this.getClient();
        const req = new GetImageRequest();
        req.setImageId(imageId);
        return new Promise<ImageMeta>((resolve, reject) => {
            client.getImage(req, (e, response) => {
                if (e) {
                    return reject(e);
                }

                const error = response.getError();
                const image = response.getImage();

                if (!image || error) {
                    return reject(
                        new GetImageError(
                            "Fetching image meta failed",
                            error || null
                        )
                    );
                }
                return resolve(metaFromImage(image));
            });
        });
    }

    getImageData = async (imageId: string) => {
        const client = this.getClient();
        const req = new GetImageDataRequest();
        req.setImageId(imageId);
        return new Promise<string | Uint8Array>((resolve, reject) => {
            client.getImageData(req, (e, response) => {
                if (e) {
                    return reject(e);
                }

                const error = response.getError();
                const bytes = response.getData();

                if (error || !bytes) {
                    return reject(
                        new GetImageError(
                            "Failed to fetch image data",
                            error || null
                        )
                    );
                }
                return resolve(bytes);
            });
        });
    }

    deleteImage = async (imageId: string): Promise<void> => {
        const client = this.getClient();
        const req = new DeleteImageRequest();
        req.setId(imageId);
        return new Promise<void>((resolve, reject) => {
            client.deleteImage(req, (e, response) => {
                if (e) {
                    return reject(e);
                }

                const status = response.getStatus();
                switch (status) {
                    case DeleteImageStatus.OK:
                        return resolve();
                    case DeleteImageStatus.DELETABLE_NOT_FOUND:
                        throw new DeleteImageError(`Image with id ${imageId} not found`, "NOT_FOUND");
                    default:
                        throw new DeleteImageError(`Failed to delete image ${imageId}`);
                }
            });
        });
    }
}
