
/**
 * Interface describing the `AccounInfo` message from
 * `account-service` protobub definition.
 */
export interface AccountWrapper {

    /**
     * ID of the account
     */
    id: string;

    /**
     * Account username
     */
    username: string;

    /**
     * Account created at timestamp
     */
    createdAt: string;

    /**
     * Account updated at timestamp
     */
    updatedAt: string;
}
