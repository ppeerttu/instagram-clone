import { SignUpErrorStatus } from "../../generated/auth_service_pb";

export class SignUpError extends Error {

    public readonly reason: null | SignUpErrorStatus;

    constructor(message: string, reason: SignUpErrorStatus | null = null) {
        super(message);
        this.reason = reason;
    }
}