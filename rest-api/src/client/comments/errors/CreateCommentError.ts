import { CreateCommentErrorStatus } from "../../generated/comment_service_pb";

export class CreateCommentError extends Error {

    public readonly status: CreateCommentErrorStatus | null;

    constructor(message: string, status: CreateCommentErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
