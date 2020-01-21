import { getProcessEnv } from "../lib/utils";


export const config = {
    /**
     * Audience of the tokens (normally this is the client app, but in our project
     * static is fine)
     */
    audience: getProcessEnv("JWT_AUDIENCE"),

    /**
     * Issuer of the tokens
     */
    issuer: getProcessEnv("JWT_ISSUER"),

    /**
     * Expiration and secret for access token
     */
    accessToken: {
        expires: 1800, // 30 minutes
        secret: getProcessEnv("JWT_ACCESS_SECRET"),
    },

    /**
     * Expiration and secret for refresh token
     */
    refreshToken: {
        expires: 691200, // 8 days
        secret: getProcessEnv("JWT_REFRESH_SECRET"),
    },
};
