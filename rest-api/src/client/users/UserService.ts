import { UserWrapper } from "../models";

export interface UserService {
    /**
     * Get user by ID.
     *
     * @param userId User ID
     */
    getUserById(userId: string): Promise<UserWrapper>;
}
