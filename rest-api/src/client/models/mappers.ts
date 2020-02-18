import { Image, ImageSearchPage as SearchPage } from "../generated/image_service_pb";
import { ImageMeta, CommentWrapper } from ".";
import { Comment } from "../generated/comment_service_pb";
import { ImageSearchPageWrapper, TagType } from "./pages";

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
        likes: image.getLikes(),
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

/**
 * Map gRPC proto search page into ImageSearchPageWrapper.
 *
 * @param page The gRPC search page
 */
export function mapImageSearchPage(page: SearchPage): ImageSearchPageWrapper {
    const tagType: TagType = page.getSearchCase() === SearchPage.SearchCase.HASH_TAG
        ? "hash-tag"
        : "user-tag";
    return {
        tagType,
        searchTag: tagType === "user-tag" ? page.getUserTag() : page.getHashTag(),
        page: page.getPage(),
        size: page.getSize(),
        count: page.getCount(),
        totalCount: page.getTotalCount(),
        content: page.getImagesList().map((image) => metaFromImage(image)),
    };
}
