import { credentials, ClientWritableStream } from "grpc";

import { GrpcClient } from "../GrpcClient";
import {
    ImageMeta,
    metaFromImage,
    ImageSearchPageWrapper,
    TagType,
    mapImageSearchPage,
} from "../models";
import { ImageService, ImageMimeType } from "./ImageService";
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
    GetImageDataResponse,
    SearchImagesRequest,
} from "../generated/image_service_pb";
import { CreateImageError, GetImageError, DeleteImageError } from "./errors";
import { ImageDataResponseRecorder } from "./helpers";
import { SearchImagesError } from "./errors/SearchImagesError";

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
        type: ImageMimeType,
        data: string | Uint8Array
    ) => {
        const client = this.getClient();
        const meta = new Metadata();
        meta.setCaption(caption);
        meta.setCreatorId(userId);
        meta.setImageType(type === "png" ? ImageType.PNG : ImageType.JPG);

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

    /**
     * Get image metadata.
     *
     * @param imageId ID of the image
     */
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

    /**
     * Get the image raw data.
     *
     * @param imageId ID of the image
     */
    getImageData = async (imageId: string) => {
        const client = this.getClient();
        const req = new GetImageDataRequest();
        req.setImageId(imageId);
        return new Promise<{ type: ImageMimeType, data: Uint8Array }>(
            (resolve, reject) => {
                const stream = client.getImageData(req);

                const recorder = new ImageDataResponseRecorder();

                stream.on("data", (chunk: GetImageDataResponse) => {
                    try {
                        recorder.receive(chunk);
                    } catch (e) {
                        reject(e);
                    }
                });

                stream.on("end", () => {
                    const type = recorder.getType();
                    const data = recorder.getData();
                    const error = recorder.getError();
                    if (error || !data) {
                        return reject(
                            new GetImageError(
                                "Failed to fetch image data",
                                error || null
                            )
                        );
                    }
                    if (type === null) {
                        return reject(
                            new GetImageError("Image type is missing")
                        );
                    }
                    return resolve({
                        type: type === ImageType.JPG ? "jpeg" : "png",
                        data,
                    });
                });

                stream.on("error", (e) => {
                    reject(e);
                });
            }
        );
    }

    /**
     * Delete an image based on id.
     *
     * @param imageId ID of the image
     */
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
                        return reject(
                            new DeleteImageError(`Image with id ${imageId} not found`, "NOT_FOUND")
                        );
                    default:
                        return reject(
                            new DeleteImageError(`Failed to delete image ${imageId}`)
                        );
                }
            });
        });
    }

    /**
     * Search images based on given tag.
     *
     * @param tag The search tag
     * @param tagType The tag type
     * @param page The page number
     * @param size The page size
     */
    searchImagesByTag = async (
        tag: string,
        tagType: TagType,
        page: number,
        size: number
    ): Promise<ImageSearchPageWrapper> => {
        const client = this.getClient();
        const req = new SearchImagesRequest();
        req.setPage(page);
        req.setSize(size);
        if (tagType === "hash-tag") {
            req.setHashTag(tag);
        } else {
            req.setUserTag(tag);
        }
        return new Promise<ImageSearchPageWrapper>((resolve, reject) => {
            client.searchImages(req, (err, res) => {
                if (err) {
                    return reject(err);
                }

                const error = res.getError();
                const resultPage = res.getPage();

                if (!resultPage || error) {
                    return reject(
                        new SearchImagesError("Search request failed", error || null)
                    );
                }
                return resolve(mapImageSearchPage(resultPage));
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
        const arr: T[] = [];
        for (let i = 0; i < size; i += CHUNK_SIZE) {
            arr.push(data.slice(i, i + CHUNK_SIZE) as T);
        }
        return arr;
    }
}
