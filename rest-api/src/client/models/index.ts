
/**
 * Object containing JWT Tokens.
 */
export interface IJWTTokens {

    /**
     * Access token; used for consuming REST APIs
     */
    accessToken: string;

    /**
     * Refresh token; used for renewing tokens
     */
    refreshToken: string;
}

export * from "./mappers";
export * from "./comment";
export * from "./image";
export * from "./pages";
