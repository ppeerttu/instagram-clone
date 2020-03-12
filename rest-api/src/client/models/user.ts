
/**
 * Interface wrapping user properties. This is currently exactly the same as
 * `AccountWrapper`.
 */
export interface UserWrapper {
    /**
     * Id of the user
     */
    id: string;
    /**
     * Username
     */
    username: string;
    /**
     * Created at timestamp
     */
    createdAt: string;
    /**
     * Updated at timestamp
     */
    updatedAt: string;
}