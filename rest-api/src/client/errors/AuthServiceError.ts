
export class AuthServiceError extends Error {

    public readonly reason: string;

    constructor(reason: string) {
        super();
        this.reason = reason;
    }
}
