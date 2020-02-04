import Router from "koa-router";

/**
 * Common controller definition that binds to `Router`.
 */
export interface IController {

    /**
     * Bind to the router.
     */
    bind: (router: Router, basePath?: string) => void;
}
