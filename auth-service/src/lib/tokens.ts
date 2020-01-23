import jwt from "jsonwebtoken";
import { config } from "../config/auth";
import { IAccount } from "../models/Account";

/**
 * Create a refresh token for given account and audience.
 *
 * @param account The account for which the token is created
 * @param aud Audience; the client application requesting the token
 */
export const createRefreshToken = (account: IAccount, aud = config.audience) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + config.refreshToken.expires;
    const payload = {
        // Audience; usually the client doing the authentication
        aud,
        // Expiration
        exp,
        // Issued at
        iat,
        // Issuer
        iss: config.issuer,
        // Subject
        sub: account.id,
        // From AWS Cognito; purpose of this token
        token_use: "refresh",
    };
    // Default algorithm is HS256
    return jwt.sign(
        payload,
        config.refreshToken.secret,
    );
};

/**
 * Create an access token for given account and audience.
 *
 * @param account The account for which the token is created
 * @param aud Audience; the client application requesting the token
 */
export const createAccessToken = (account: IAccount, aud = config.audience) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + config.accessToken.expires;
    const payload = {
        aud,
        exp,
        iat,
        iss: config.issuer,
        sub: account.id,
        token_use: "access",
        // Since we have rather simple user model and we don't have id token, provide
        // username here
        username: account.username,
    };
    // Default algorithm is HS256
    return jwt.sign(
        payload,
        config.accessToken.secret,
    );
};

export const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, async (err, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};
