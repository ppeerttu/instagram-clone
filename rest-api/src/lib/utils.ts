import { AuthService } from "../client/auth";
import { RouterContext } from "@koa/router";

/**
 * Get a variable from `process.env` and throw if not found.
 *
 * @param value The env variable e.g `SERVER_PORT`
 * @param fallback Optional fallback value in case the value is empty (or not defined)
 */
export function getProcessEnv(
    value: string,
    fallback: string | null = null,
): string {
    if (typeof value !== "string") {
        throw new TypeError(`Expected value to be string but received: ${value}`);
    }
    const val = process.env[value];
    if (!val && !fallback) {
        throw new Error(`Unable to find env variable ${value}`);
    }
    return val || fallback as string;
}

/**
 * Delay executon for given period of time.
 *
 * @param ms Time in milliseconds
 */
export async function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

/**
 * Get bearer token from request headers.
 *
 * @param ctx Context
 */
export function getBearerToken(ctx: RouterContext): string | null {
    const { headers } = ctx;
    const authorization = headers && headers.authorization;
    if (typeof authorization === "string") {
        const find = "Bearer ";
        let index = authorization.indexOf(find);
        if (index < 0) {
            index = authorization.indexOf(find.toLowerCase());
        }
        if (index > -1) {
            return authorization.slice(index + find.length);
        }
    }
    return null;
}

