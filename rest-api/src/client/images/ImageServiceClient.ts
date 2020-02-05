import { credentials } from "grpc";

import { GrpcClient } from "../GrpcClient";
import { ImageMeta } from "../models";
import { ImageService } from "./ImageService";
import { config } from "../../config/grpc";
import { ImagesClient } from "../generated/image_service_grpc_pb";
import { CreateImageRequest } from "../generated/image_service_pb";
import { CreateImageError } from "./CreateImageError";


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

    createImage = async (caption: string, userId: string, data: string | Uint8Array) => {
        const req = new CreateImageRequest();
        req.setCaption(caption);
        req.setCreatorId(userId);
        req.setData(data);

        this.updateClient();
        const client = this.client;

        if (!client) {
            throw new Error(`No known endpoints for service ${this.serviceName}`);
        }

        return new Promise<ImageMeta>((resolve, reject) => {
            client.createImage(req, (e, response) => {
                if (e) {
                    return reject(e);
                }
                const error = response.getError();
                const meta = response.getImage();

                if (!meta || error) {
                    return reject(
                        new CreateImageError("Image creation failed", error || null)
                    );
                }
                return resolve({
                    id: meta.getId(),
                    caption: meta.getCaption(),
                    userId: meta.getUserId(),
                    height: meta.getHeight(),
                    width: meta.getWidth(),
                    mimeType: meta.getMimeType(),
                    hashTags: meta.getHashTagsList(),
                    userTags: meta.getUserTagsList(),
                    createdAt: meta.getCreatedAt(),
                });
            });
        });
    }
}
