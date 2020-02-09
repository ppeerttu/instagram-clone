
type DeleteErrorCause = "NOT_FOUND" | "UNKNOWN";

/**
 * Class representing error during image deletion.
 */
export class DeleteImageError extends Error {

    public readonly cause: DeleteErrorCause;

    constructor(message: string, cause: DeleteErrorCause = "UNKNOWN") {
        super(message);
        this.cause = cause;
    }
}
