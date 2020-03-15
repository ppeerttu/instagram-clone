import { body, validationResults, IValidationState } from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";

import { IController } from "./Controller";
import { RequestError } from "../lib/RequestError";
import { AuthServiceError } from "../client/auth/errors/AuthServiceError";
import { AuthService } from "../client/auth";
import { SignUpError } from "../client/auth/errors/SignUpError";
import { AuthState, generateAuthMiddleware } from "../middleware/authenticate";
import { getBearerToken } from "../lib/utils";
import { RenewTokensError } from "../client/auth/errors/RenewTokensError";
import { AuthErrorStatus, DeleteAccountErrorStatus, SignUpErrorStatus } from "../client/generated/auth_service_pb";
import { DeleteAccountError } from "../client/auth/errors/DeleteAccountError";

/**
 * Authentication REST API controller.
 */
export class AuthController implements IController {


    /**
     * Validations for sign in method
     */
    private signInValidation = [
        body("username")
            .isLength({ min: 1, max: 55 })
            .withMessage("The username has to be between 1 and 55 characters long")
            .run(),
        body("password")
            .isLength({ min: 1, max: 55 })
            .withMessage("The password has to be between 1 and 55 characters long")
            .run()
    ];

    private signUpValidation = [
        body("username")
            .trim()
            .isLength({ min: 4, max: 29 })
            .withMessage("Username has to be between 4 and 29 characters long")
            .run(),
        body("password")
            .isLength({ min: 4, max: 29 })
            .withMessage("Password has to be between 4 and 29 characters long")
            .run(),
    ];

    /**
     * Auth service client
     */
    private authService: AuthService;

    public constructor(authService: AuthService) {
        this.authService = authService;
    }

    bind = (router: Router, basePath = "/auth"): void => {
        // TODO: bind routes
        router.post(
            `${basePath}/sign-in`,
            ...this.signInValidation,
            this.signIn,
        );
        router.post(
            `${basePath}/sign-up`,
            ...this.signUpValidation,
            this.signUp,
        );
        router.get(
            `${basePath}/me`,
            generateAuthMiddleware(this.authService),
            this.getMe,
        );
        router.get(
            `${basePath}/renew`,
            this.renewTokens
        );
        router.delete(
            `${basePath}/me`,
            generateAuthMiddleware(this.authService),
            this.deleteAccount,
        );
    }

    /**
     * Sign in request controller. Pass valid request to the auth-service in order to
     * sign the user in.
     */
    private signIn = async (
        ctx: RouterContext<IValidationState>
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { username, password } = ctx.request.body;

        try {
            const response = await this.authService.signIn(username, password);
            ctx.body = response;
            ctx.status = 200;
        } catch (e) {
            if (e instanceof AuthServiceError) {
                throw new RequestError(401, e.reason);
            }
            // e is probably ServiceError, report that the service is not healthy
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    /**
     * Sign up an user.
     */
    private signUp = async (
        ctx: RouterContext<IValidationState>
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { username, password } = results.passedData();

        try {
            const response = await this.authService.signUp(username, password);
            ctx.body = response;
            ctx.status = 200;
        } catch (e) {
            if (e instanceof SignUpError) {
                switch (e.reason) {
                    case SignUpErrorStatus.USERNAME_IN_USE:
                        throw new RequestError(409, "Username already in use");
                    case SignUpErrorStatus.SIGNUP_INVALID_PASSWORD:
                        throw new RequestError(400, "Username is invalid");
                    case SignUpErrorStatus.SIGNUP_INVALID_PASSWORD:
                        throw new RequestError(400, "Password is invalid");
                    default:
                        ctx.log.warn(e);
                        throw new RequestError(500);                }
            }
            // e is probably ServiceError, report that the service is not healthy
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    /**
     * Get the user who is making the request.
     */
    private getMe = async (
        ctx: RouterContext<AuthState>
    ) => {
        const account = ctx.state.account;
        ctx.body = account;
        ctx.status = 200;
    }

    /**
     * Renew tokens with refresh token.
     */
    private renewTokens = async (ctx: RouterContext) => {
        const refreshToken = getBearerToken(ctx);
        if (!refreshToken) {
            throw new RequestError(401);
        }
        try {
            const tokens = await this.authService.renewToken(refreshToken);
            ctx.body = tokens;
            ctx.status = 200;
        } catch (e) {
            if (e instanceof RenewTokensError) {
                switch (e.reason) {
                    case AuthErrorStatus.BAD_CREDENTIALS:
                    case AuthErrorStatus.EXPIRED_TOKEN:
                    case AuthErrorStatus.INVALID_TOKEN:
                        throw new RequestError(401);
                    default:
                        ctx.log.warn(e);
                        throw new RequestError(500);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    private deleteAccount = async (ctx: RouterContext<AuthState>) => {
        const { token, account } = ctx.state;
        ctx.log.info(`Deleting account with username ${account.username} and id ${account.id}`);
        try {
            const id = await this.authService.deleteAccount(token);
            ctx.log.info(`Account ${id} deleted`);
            ctx.status = 204;
        } catch (e) {
            if (e instanceof DeleteAccountError) {
                switch (e.reason) {
                    case DeleteAccountErrorStatus.DELETE_SERVER_ERROR:
                        ctx.log.warn(e);
                        throw new RequestError(500);
                    default:
                        throw new RequestError(401);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }
}
