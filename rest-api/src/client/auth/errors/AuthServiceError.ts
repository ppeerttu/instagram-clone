
/**
 * Auth service error
 */
export class AuthServiceError extends Error {

    /**
     * Reason of the auth service error
     */
    public readonly reason: string;

    constructor(reason: string) {
        super();
        this.reason = reason;
    }
}
