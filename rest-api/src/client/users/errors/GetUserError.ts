import { GetUserResponseError } from "../../generated/user_service_pb";

export class GetUserError extends Error {
    constructor(
        message: string,
        public readonly reason: GetUserResponseError | null = null
    ) {
        super(message);
    }
}