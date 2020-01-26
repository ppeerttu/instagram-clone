
/**
 * Error that can be thrown in Koa controllers.
 */
export class RequestError {

    /**
     * Error name
     */
    public static NAME = "RequestError";

    /**
     * Response status code
     */
    public readonly status: number;

    /**
     * Response body
     */
    public readonly data: any = null;

    public readonly name = RequestError.NAME;

    /**
     * Request error message
     */
    public readonly message: string;

    /**
     * Timestamp of the error
     */
    public readonly timestamp = new Date().toJSON();

    /**
     * Create a new `RequestError` instance.
     *
     * @param status Status code for response
     * @param dataOrMessage The response message or data
     * @param data The response data (if `dataOrMessage` contains a message)
     *
     * @example
     * throw new RequestError(401, "Unauthorized");
     * throw new RequestError(
     *     409,
     *     "Username already taken",
     *     { errors: [{ param: "username" ... }]} // Merge these into the response body
     * )
     */
    constructor(status: number, dataOrMessage: string | any = null, data: any = null) {
        this.status = status;
        if (typeof dataOrMessage === "string") {
            this.message = dataOrMessage;
            this.data = data;
        } else {
            this.data = dataOrMessage;
            switch (status) {
                case 503:
                    this.message = "Service unavailable";
                    break;
                case 501:
                    this.message = "Not implemented";
                    break;
                case 500:
                    this.message = "Internal server error";
                    break;
                case 422:
                    this.message = "Unprocessable entity";
                    break;
                case 409:
                    this.message = "Conflict";
                    break;
                case 404:
                    this.message = "Not found";
                    break;
                case 403:
                    this.message = "Access forbidden";
                    break;
                case 401:
                    this.message = "Unauthorized";
                    break;
                default:
                    this.message = "Bad request";
                    break;
            }
        }
    }
}
