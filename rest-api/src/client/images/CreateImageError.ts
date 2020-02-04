import { CreateImageErrorStatus } from "../generated/image_service_pb";

/**
 * Error thrown when create image operation fails.
 */
export class CreateImageError extends Error {

    public readonly status: CreateImageErrorStatus | null;

    constructor(message: string, status: CreateImageErrorStatus | null = null) {
        super(message);
        this.status = status;
    }

}
