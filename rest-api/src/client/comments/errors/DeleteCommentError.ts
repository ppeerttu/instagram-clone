import { DeleteCommentErrorStatus } from "../../generated/comment_service_pb";

export class DeleteCommentError extends Error {

    public readonly status: DeleteCommentErrorStatus | null;

    constructor(message: string, status: DeleteCommentErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
