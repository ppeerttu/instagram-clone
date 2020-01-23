import Router from "koa-router";

export interface IController {
    bind: (router: Router, basePath?: string) => void;
}
