import { ImageType, GetImageDataResponse, GetImageErrorStatus } from "../generated/image_service_pb";

/**
 * Helper class for recording streaming response of image data.
 */
export class ImageDataResponseRecorder {

    /**
     * The raw image data
     */
    private data: Uint8Array | null = null;

    /**
     * The image type
     */
    private imageType: ImageType | null = null;

    /**
     * Possible error response
     */
    private error: GetImageErrorStatus | null = null;

    /**
     * Has the recording started?
     */
    public isStarted(): boolean {
        return this.imageType !== null;
    }

    /**
     * Get the possible error
     */
    public getError(): GetImageErrorStatus | null {
        return this.error;
    }

    /**
     * Get the image type
     */
    public getType(): ImageType | null {
        return this.imageType;
    }

    /**
     * Get image data
     */
    public getData(): Uint8Array | null {
        return this.data;
    }

    /**
     * Receive next chunk of stream response.
     *
     * @param res The response
     */
    public receive(res: GetImageDataResponse) {
        const error = res.getError();
        if (error) {
            this.error = error;
            return;
        }
        if (this.imageType === null) {
            this.imageType = res.getImageType();
            if (this.imageType !== ImageType.JPG && this.imageType !== ImageType.PNG) {
                throw new Error(
                    `The first chunk should contain image type but got: ${this.imageType}`
                );
            }
            return;
        }
        const data = res.getData_asU8();
        this.data = this.data === null
            ? data
            : this.concatBuffers(this.data, data);
    }

    /**
     * Concatenate buffers.
     *
     * @param buf1 Buffer 1
     * @param buf2 Buffer 2
     */
    private concatBuffers(buf1: Uint8Array, buf2: Uint8Array): Uint8Array {
        const tmp = new Uint8Array(buf1.length + buf2.length);
        tmp.set(buf1, 0);
        tmp.set(buf2, buf1.length);
        return tmp;
    }
}
