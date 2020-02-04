import { ParameterizedContext } from "koa";
import { body, IValidationContext, validationResults } from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";
import multer, { File } from "@koa/multer";

import { IController } from "./Controller";
import { ImageService } from "../client/images/ImageService";
import { RequestError } from "../lib/RequestError";
import { CreateImageError } from "../client/images/CreateImageError";
import { CreateImageErrorStatus } from "../client/generated/image_service_pb";

const upload = multer();

export class ImageController implements IController {

    private createImageValidation = [
        body("userId")
            .isUUID()
            .withMessage("The user ID should be an UUID")
            .run(),
        body("caption")
            .isLength({ max: 500 })
            .withMessage("The caption cannot be longer than 500 characters")
            .run()
    ];

    private imageService: ImageService;

    public constructor(imageService: ImageService) {
        this.imageService = imageService;
    }

    bind = (router: Router, basePath = "/images"): void => {
        router.post(
            `${basePath}`,
            upload.single("image") as any, // For TSC
            ...this.createImageValidation,
            this.postImage,
        );
    }

    /**
     * Post an image to the system.
     */
    private postImage = async (
        ctx: ParameterizedContext<IValidationContext, RouterContext>,
    ) => {
        const results = validationResults(ctx);
        const file = (ctx as any).file as File; // For TSC

        if (results.hasErrors() || !file ) {
            const errors = results.array();
            if (!file) {
                errors.push({
                    param: "image",
                    msg: "Image file has to be set",
                    value: "",
                    location: "body",
                });
            }
            throw new RequestError(422, { errors });
        }

        const { userId, caption } = ctx.request.body;

        /**
         * structure of file:
         * {
         *   fieldname: 'image',
         *   originalname: 'newplot (1).png',
         *   encoding: '7bit',
         *   mimetype: 'image/png',
         *   buffer: <Buffer 89 50 4e ...>,
         *   size: 392803
         * }
         */
        // TODO: Check file size, cancel request if too large

        try {
            const response = await this.imageService.createImage(
                caption,
                userId,
                file.buffer
            );
            ctx.body = response;
            ctx.status = 200;
        } catch (e) {
            if (e instanceof CreateImageError) {
                switch (e.status) {
                    case CreateImageErrorStatus.CAPTION_TOO_LONG:
                        throw new RequestError(400, "Caption too long");
                    case CreateImageErrorStatus.CONTENT_TOO_LONG:
                        throw new RequestError(400, "Image size too large");
                    case CreateImageErrorStatus.CREATOR_NOT_FOUND:
                        throw new RequestError(409, `No user found with id ${userId}`);
                    case CreateImageErrorStatus.INVALID_DATA:
                        throw new RequestError(400, "Invalid image data");
                    default:
                        throw new RequestError(503);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }

    }
}
