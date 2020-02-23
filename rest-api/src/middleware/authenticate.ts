import { Next } from "koa";
import { Middleware, RouterContext } from "@koa/router";

import { AuthService } from "../client/auth";
import { RequestError } from "../lib/RequestError";
import { getBearerToken } from "../lib/utils";
import { AccountWrapper } from "../client/models";
import { AuthServiceError } from "../client/auth/errors/AuthServiceError";

/**
 * Authentication information state.
 */
export interface AuthState {

    /**
     * The account info
     */
    account: AccountWrapper;
}

/**
 * Generate an auth middleware function, which will populate the `ctx.state.account`
 * property with account details.
 *
 * @param service The auth service instance
 */
export function generateAuthMiddleware(
    service: AuthService
): Middleware {
    return async (ctx: RouterContext, next: Next) => {
        const token = getBearerToken(ctx);
        if (!token) {
            throw new RequestError(401);
        }
        try {
            const account = await service.getAccount(token);
            ctx.state.account = account;
        } catch (e) {
            if (e instanceof AuthServiceError) {
                throw new RequestError(401);
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
        return next();
    }
}
