import { Image } from "../generated/image_service_pb";
import { ImageMeta } from ".";

/**
 * Map Image instance into object matching ImageMeta interface.
 *
 * @param image The Image instance
 */
export function metaFromImage(image: Image): ImageMeta {
    return {
        id: image.getId(),
        caption: image.getCaption(),
        userId: image.getUserId(),
        height: image.getHeight(),
        width: image.getWidth(),
        mimeType: image.getMimeType(),
        hashTags: image.getHashTagsList(),
        userTags: image.getUserTagsList(),
        createdAt: image.getCreatedAt(),
    };
}
