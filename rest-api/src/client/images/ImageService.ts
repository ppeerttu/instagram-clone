import { ImageMeta } from "../models";
import { TagType, ImageSearchPageWrapper, ImageLikesPageWrapper } from "../models/pages";

export type ImageMimeType = "png" | "jpeg"

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
        type: ImageMimeType,
        data: string | Uint8Array
    ): Promise<ImageMeta>;

    /**
     * Get image metadata.
     *
     * @param imageId The ID of the image
     */
    getImageMeta(imageId: string): Promise<ImageMeta>;

    /**
     * Get image byte data.
     *
     * @param imageId The ID of the image
     */
    getImageData(imageId: string): Promise<{ type: ImageMimeType, data: Uint8Array }>;

    /**
     * Delete an image based on ID.
     *
     * @param imageId The ID of the image
     */
    deleteImage(imageId: string): Promise<void>;

    /**
     * Search images by tag.
     *
     * @param tag The tag to search
     * @param tagType The type of the tag
     * @param page Page number
     * @param size Page size
     */
    searchImagesByTag(
        tag: string,
        tagType: TagType,
        page: number,
        size: number,
    ): Promise<ImageSearchPageWrapper>;

    /**
     * Like about an image.
     *
     * @param imageId The image ID
     * @param userId The user ID
     * @param unlike Whether to unlike the image
     */
    likeImage(imageId: string, userId: string, unlike?: boolean): Promise<void>;

    /**
     * Get image likes.
     *
     * @param imageId The image Id
     * @param page The page number
     * @param size The page size
     */
    getLikes(imageId: string, page: number, size: number): Promise<ImageLikesPageWrapper>;
}
