import { ImageMeta } from "../models";

/**
 * Image service interface description
 */
export interface ImageService {

    /**
     * Create a new image.
     *
     * @param caption The caption
     * @param userId Poster ID
     * @param data Image data
     */
    createImage(
        caption: string,
        userId: string,
        data: string | Uint8Array
    ): Promise<ImageMeta>;

    /**
     * Get image metadata.
     *
     * @param imageId The ID of the image
     */
    getImageMeta(imageId: string): Promise<ImageMeta | null>;

    /**
     * Get image byte data.
     *
     * @param imageId The ID of the image
     */
    getImageData(imageId: string): Promise<string | Uint8Array>;

    /**
     * Delete an image based on ID.
     *
     * @param imageId The ID of the image
     */
    deleteImage(imageId: string): Promise<void>;
}
