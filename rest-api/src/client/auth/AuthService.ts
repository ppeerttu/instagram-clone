import { IJWTTokens, AccountWrapper } from "../models";

/**
 * Auth service interface description.
 */
export interface AuthService {

    /**
     * Sign up.
     *
     * @param username The username
     * @param password The password
     */
    signUp: (username: string, password: string) => Promise<AccountWrapper>;

    /**
     * Sign in the user.
     *
     * @param username The username
     * @param password The password
     */
    signIn: (username: string, password: string) => Promise<IJWTTokens>;

    /**
     * Get account information based on access token.
     *
     * @param accessToken The access token
     */
    getAccount(accessToken: string): Promise<AccountWrapper>;

    /**
     * Get a new pair of tokens.
     *
     * @param refreshToken The refresh token
     */
    renewToken(refreshToken: string): Promise<IJWTTokens>;
}
