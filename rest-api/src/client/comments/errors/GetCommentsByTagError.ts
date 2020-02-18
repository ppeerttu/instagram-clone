import { GetCommentsByTagErrorStatus } from "../../generated/comment_service_pb";

export class GetCommentsByTagError extends Error {

    public readonly status: GetCommentsByTagErrorStatus | null;

    constructor(message: string, status: GetCommentsByTagErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
