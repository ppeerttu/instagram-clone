import { SearchImagesErrorStatus } from "../../generated/image_service_pb";

/**
 * Error class wrapping search images errors.
 */
export class SearchImagesError extends Error {

    public readonly reason: SearchImagesErrorStatus | null;

    constructor(message: string, reason: SearchImagesErrorStatus | null = null) {
        super(message);
        this.reason = reason;
    }
}