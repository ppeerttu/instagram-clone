import Router, { RouterContext } from "@koa/router";
import { IValidationState, param, validationResults } from "koa-req-validation";

import { UserService } from "../client/users/UserService";
import { IController } from "./Controller";
import { RequestError } from "../lib/RequestError";
import { GetUserError } from "../client/users/errors/GetUserError";
import { GetUserResponseError } from "../client/generated/user_service_pb";

export class UserController implements IController {

    private userIdValidation = param("userId")
        .isUUID()
        .withMessage("User ID has to be an UUID")
        .run();

    constructor(private readonly userService: UserService) {}

    public bind(router: Router, basePath = "/users") {
        router.get(`${basePath}/:userId`, this.userIdValidation, this.getUser);
    }

    public getUser = async (ctx: RouterContext<IValidationState>) => {
        const result = validationResults(ctx);
        if (result.hasErrors()) {
            throw new RequestError(422, { errors: result.array() });
        }

        const { userId } = result.passedData();

        try {
            const user = await this.userService.getUserById(userId);
            ctx.body = user;
            ctx.status = 200;
        } catch (e) {
            if (e instanceof GetUserError) {
                switch (e.reason) {
                    case GetUserResponseError.ACCOUNT_ID_NOT_FOUND:
                        throw new RequestError(404, `No user found with id ${userId}`);
                    default:
                        ctx.log.warn(e);
                        throw new RequestError(500);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }
}