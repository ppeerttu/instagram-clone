import { Image, ImageSearchPage as SearchPage, ImageLikesPage } from "../generated/image_service_pb";
import { ImageMeta, CommentWrapper } from ".";
import { Comment } from "../generated/comment_service_pb";
import { ImageSearchPageWrapper, TagType, ImageLikesPageWrapper } from "./pages";
import { AccountInfo } from "../generated/auth_service_pb";
import { AccountWrapper } from "./account";
import { UserInfo } from "../generated/user_service_pb";
import { UserWrapper } from "./user";

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
 * Map gRPC proto search page into `ImageSearchPageWrapper`.
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

/**
 * Map gRPC image likes page into `ImageLikesPageWrapper`.
 *
 * @param page The gRPC image likes page
 */
export function mapImageLikesPage(page: ImageLikesPage): ImageLikesPageWrapper {
    return {
        imageId: page.getImageId(),
        page: page.getPage(),
        size: page.getSize(),
        count: page.getUsersCount(),
        totalCount: page.getTotalUsersCount(),
        content: page.getUsersList(),
    };
}

/**
 * Map gRPC account info into `AccountWrapper`.
 *
 * @param info The gRPC account info message
 */
export function mapAccountInfo(info: AccountInfo): AccountWrapper {
    return {
        id: info.getId(),
        username: info.getUsername(),
        updatedAt: info.getUpdatedAt(),
        createdAt: info.getCreatedAt(),
    };
}

/**
 * Map gRPC user info into `UserWrapper`.
 *
 * @param info The gRPC user info message payload
 */
export function mapUserInfo(info: UserInfo): UserWrapper {
    return {
        id: info.getId(),
        username: info.getUsername(),
        updatedAt: info.getUpdatedAt(),
        createdAt: info.getCreatedAt(),
    };
}