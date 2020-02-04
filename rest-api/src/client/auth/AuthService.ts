import { IJWTTokens } from "../models";

/**
 * Auth service interface description.
 */
export interface AuthService {

    /**
     * Sign in the user.
     */
    signIn: (username: string, password: string) => Promise<IJWTTokens>;
}
