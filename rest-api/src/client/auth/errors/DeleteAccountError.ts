import { DeleteAccountErrorStatus } from "../../generated/auth_service_pb";

export class DeleteAccountError extends Error {
    constructor(
        message: string,
        public readonly reason: DeleteAccountErrorStatus | null = null
    ) {
        super(message);
    }
}