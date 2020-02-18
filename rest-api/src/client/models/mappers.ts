import { Image } from "../generated/image_service_pb";
import { ImageMeta, CommentWrapper } from ".";
import { Comment } from "../generated/comment_service_pb";

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

/**
 * Map Grpc proto comment to non-grpc CommentWrapper. 
 *
 * @param comment Grpc image
 *
 */
export function mapComment(comment: Comment): CommentWrapper {
    return {
        content: comment.getContent(),
        id: comment.getId(),
        userId: comment.getUserId(),
        createdAt: comment.getCreatedAt(),
        tags: comment.getTagsList(),
        userTags: comment.getUsertagsList()
    }
}
