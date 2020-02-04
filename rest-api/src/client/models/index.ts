
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

/**
 * Image meta data
 */
export interface ImageMeta {

    /**
     * ID of the image
     */
    id: string;

    /**
     * Caption of the image
     */
    caption: string;

    /**
     * Type of the image
     */
    type: string;

    /**
     * Height of the image
     */
    height: number;

    /**
     * Width of the image
     */
    width: number;

    /**
     * Image poster ID
     */
    userId: string;

    /**
     * Creatd at timestap
     */
    createdAt: string;
}
