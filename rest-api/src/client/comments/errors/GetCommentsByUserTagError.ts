import { GetCommentsByUserTagErrorStatus } from "../../generated/comment_service_pb";

export class GetCommentsByUserTagError extends Error {

    public readonly status: GetCommentsByUserTagErrorStatus | null;

    constructor(message: string, status: GetCommentsByUserTagErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
