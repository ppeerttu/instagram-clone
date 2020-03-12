import { AuthErrorStatus } from "../../generated/auth_service_pb";

export class RenewTokensError extends Error {
    constructor(message: string, public readonly reason: AuthErrorStatus | null = null) {
        super(message);
    }
}