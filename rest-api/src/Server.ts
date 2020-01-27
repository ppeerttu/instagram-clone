import Koa, { ParameterizedContext } from "koa";
import bodyParser from "koa-bodyparser";
import middlewareLogger from "koa-pino-logger";
import Router, { IRouterContext } from "koa-router";
import pino from "pino";

import { AuthController } from "./controllers/AuthController";
import { RequestError } from "./lib/RequestError";
import { AuthService } from "./client/auth";

/**
 * Class containing the application server logic
 */
export default class Server {

    /**
     * Koa instance
     */
    public readonly app: Koa;

    /**
     * Router instance
     */
    public readonly router: Router;

    /**
     * Logger of the application server
     */
    public readonly logger: pino.Logger;

    constructor(logger: pino.Logger) {
        this.app = new Koa();
        this.router = new Router();
        this.logger = logger;
    }

    /**
     * Configure the application middleware.
     */
    public configure() {
        this.app
            .use(middlewareLogger())
            .use(bodyParser())
            .use(async (ctx: ParameterizedContext<IRouterContext>, next) => {
                try {
                    await next();
                } catch (e) {
                    let error: RequestError;
                    if (e.name === RequestError.NAME) {
                        error = e;
                    } else {
                        this.logger.error(e);
                        error = new RequestError(500);
                    }
                    const { status, timestamp, message, data } = error;
                    ctx.status = status;
                    ctx.body = {
                        ...data,
                        status,
                        timestamp,
                        message,
                    };
                }
            });
    }

    /**
     * Bind controller routes into the application.
     *
     * @param authService Implementation for `AuthService`
     */
    public bindRoutes(authService: AuthService) {
        const authController = new AuthController(authService);
        authController.bind(this.router);

        this.app
            .use(this.router.routes())
            .use(this.router.allowedMethods());
    }
}
