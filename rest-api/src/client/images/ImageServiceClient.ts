import { credentials, ClientWritableStream } from "grpc";

import { GrpcClient } from "../GrpcClient";
import { ImageMeta, metaFromImage } from "../models";
import { ImageService } from "./ImageService";
import { config } from "../../config/grpc";
import { ImagesClient } from "../generated/image_service_grpc_pb";
import {
    CreateImageRequest,
    GetImageRequest,
    GetImageDataRequest,
    DeleteImageRequest,
    DeleteImageStatus,
    Metadata,
    ImageType,
} from "../generated/image_service_pb";
import { CreateImageError, GetImageError, DeleteImageError } from "./errors";

// Chunk size in bytes
const CHUNK_SIZE = 1024 * 16; // 16KB

/**
 * Types that can be converted into `bytes` type of protobuf
 */
type GrpcBytes = string | Uint8Array;


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

    createImage = async (
        caption: string,
        userId: string,
        type: "jpg" | "png",
        data: string | Uint8Array
    ) => {
        const client = this.getClient();
        const meta = new Metadata();
        meta.setCaption(caption);
        meta.setCreatorId(userId);
        meta.setImageType(type === "png" ? ImageType.PNG : ImageType.JPG);

        console.log("Sending out, first 10 bytes: " + data.slice(0, 10))

        const promise = new Promise<ImageMeta>((resolve, reject) => {
            const stream = client.createImage((e, response) => {
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

            this.writeImageToStream(stream, meta, data);
        });

        return promise;
    }

    /**
     * Write the image into the request stream.
     *
     * @param stream The write stream
     * @param meta Image meta data
     * @param image Image data
     *
     * @todo Should we wait untile each chunk has been flushed before sending the
     * next one?
     */
    private async writeImageToStream(
        stream: ClientWritableStream<CreateImageRequest>,
        meta: Metadata,
        image: string | Uint8Array
    ) {
        const head = new CreateImageRequest();
        head.setMetaData(meta);
        stream.write(head);

        const chunks = this.getChunks(image);
        for (const chunk of chunks) {
            const req = new CreateImageRequest();
            req.setData(chunk);
            stream.write(req);
        }
        stream.end();
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

    // 0a, e3, a9, 1b, [89, 50, 4e, 47, 0d, 0a, ...] PNG
    // 0a, ef, c4, e7, 01, [ff, d8, ff, e1, 72, ...] JPEG
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
                console.log("Received, first 10 bytes:" + bytes.slice(0, 10));
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

    /**
     * Chunk the data into an array of data.
     *
     * @param data The image data to be chunked up
     */
    private getChunks<T extends GrpcBytes>(data: T): T[] {
        const size = data.length;
        const chunkCount = Math.ceil(size / CHUNK_SIZE);
        console.log(`Chunking into ${chunkCount} chunks`);
        const arr: T[] = [];
        for (let i = 0; i < size; i += CHUNK_SIZE) {
            arr.push(data.slice(i, i + CHUNK_SIZE) as T);
        }
        return arr;
    }
}
