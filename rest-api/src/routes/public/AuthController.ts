import { ParameterizedContext } from "koa";
import { body, validationResults, IValidationContext } from "koa-req-validation";
import Router, { IRouterContext } from "koa-router";

import { IController } from "../Controller";
import { RequestError } from "../../lib/RequestError";

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
        ctx: ParameterizedContext<IValidationContext, IRouterContext>
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { username, password } = ctx.request.body;
        ctx.log.info(`User trying to sign in with username ${username} and password ${password}`);
    }
}
