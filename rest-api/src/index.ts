import http from "http";
import Koa, { ParameterizedContext } from "koa";
import bodyParser from "koa-bodyparser";
import Router, { IRouterContext } from "koa-router";
import middlewareLogger from "koa-pino-logger";
import pino from "pino";

import { AuthController } from "./routes/public/AuthController";
import { RequestError } from "./lib/RequestError";

const app = new Koa();
const router = new Router();
const logger = pino();

const authController = new AuthController();

authController.bind(router);

app
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
                logger.error(e);
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
    })
    .use(router.routes())
    .use(router.allowedMethods());

const server = http.createServer(app.callback());

server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr ? addr.port : "N/A"}`;
    logger.info(`Server listening on ${bind}`);
});

server.listen(getServerPort());

/**
 * Get server port number from `process.env`.
 *
 * @param defaultPort The default port number
 */
function getServerPort(defaultPort = 4000): number {
    const port = parseInt(process.env.SERVER_PORT || "", 10);
    if (isNaN(port)) {
        return defaultPort;
    }
    return port;
}
