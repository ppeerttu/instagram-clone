import { ParameterizedContext } from "koa";
import { body, validationResults, IValidationContext } from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";

import { IController } from "./Controller";
import { RequestError } from "../lib/RequestError";
import { AuthServiceError } from "../client/auth/AuthServiceError";
import { AuthService } from "../client/auth";

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
    }

    /**
     * Sign in request controller. Pass valid request to the auth-service in order to
     * sign the user in.
     */
    private signIn = async (
        ctx: ParameterizedContext<IValidationContext, RouterContext>
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
}
