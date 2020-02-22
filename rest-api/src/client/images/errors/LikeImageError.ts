import { LikeImageResponseStatus } from "../../generated/image_service_pb";

export class LikeImageError extends Error {

    public readonly reason: LikeImageResponseStatus | null = null;

    constructor(message: string, reason: LikeImageResponseStatus | null = null) {
        super(message);
        this.reason = reason;
    }
}