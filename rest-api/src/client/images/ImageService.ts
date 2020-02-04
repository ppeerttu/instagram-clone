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
}
