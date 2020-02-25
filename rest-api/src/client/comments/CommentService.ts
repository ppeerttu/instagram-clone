import { CommentWrapper, Page } from "../models";

export interface CommentService {

    createComment(
        content: string,
        userId: string,
        imageId: string,
        tags: string[],
        userTags: string[]
    ): Promise<CommentWrapper>

    getComment(
        id: string
    ): Promise<CommentWrapper>

    deleteComment(id: string): Promise<string>

    getCommentsByHashTag(hashtag: string): Promise<CommentWrapper[]>

    getCommentsByUserTag(userTag: string): Promise<CommentWrapper[]>

    getCommentsForImage(id: string, page: number, size: number): Promise<Page<CommentWrapper>
}