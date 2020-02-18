import { GetCommentErrorStatus } from "../../generated/comment_service_pb";

export class GetCommentError extends Error {

    public readonly status: GetCommentErrorStatus | null;

    constructor(message: string, status: GetCommentErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
