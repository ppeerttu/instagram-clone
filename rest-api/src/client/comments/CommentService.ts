import { CommentWrapper } from "../models";

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
}