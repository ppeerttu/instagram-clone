import { GetImageErrorStatus } from "../../generated/image_service_pb";

/**
 * Error thrown when create image operation fails.
 */
export class GetImageError extends Error {

    public readonly status: GetImageErrorStatus | null;

    constructor(message: string, status: GetImageErrorStatus | null = null) {
        super(message);
        this.status = status;
    }
}
