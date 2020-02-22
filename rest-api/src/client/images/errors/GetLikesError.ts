import { GetLikesErrorStatus } from "../../generated/image_service_pb";

export class GetLikesError extends Error {

    public readonly reason: GetLikesErrorStatus | null = null;

    constructor(message: string, reason: GetLikesErrorStatus | null = null) {
        super(message);
        this.reason = reason;
    }
}