import { IJWTTokens, AccountWrapper } from "../models";

/**
 * Auth service interface description.
 */
export interface AuthService {

    /**
     * Sign in the user.
     */
    signIn: (username: string, password: string) => Promise<IJWTTokens>;

    /**
     * Get account information based on access token.
     *
     * @param accessToken The access token
     */
    getAccount(accessToken: string): Promise<AccountWrapper>;
}
