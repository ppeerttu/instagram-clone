import { ParameterizedContext } from "koa";
import { body, IValidationContext, validationResults, param } from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";
import multer, { File } from "@koa/multer";
import FileType from "file-type";

import { IController } from "./Controller";
import { ImageService } from "../client/images/ImageService";
import { RequestError } from "../lib/RequestError";
import { CreateImageError } from "../client/images/errors/CreateImageError";
import { CreateImageErrorStatus, GetImageErrorStatus } from "../client/generated/image_service_pb";
import { DeleteImageError, GetImageError } from "../client/images/errors";

const allowedFileTypes = [
    "image/png",
    "image/jpeg"
];

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(null, false);
        } else {
            cb(null, true);
        }
    }
});

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

    private imageIdValidation = [
        param("imageId")
            .isUUID()
            .withMessage("The imageId parameter has to be an UUID")
            .run(),
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
        router.delete(
            `${basePath}/:imageId`,
            ...this.imageIdValidation,
            this.deleteImage,
        );
        router.get(
            `${basePath}/:imageId/meta`,
            ...this.imageIdValidation,
            this.getImageMeta,
        );
        router.get(
            `${basePath}/:imageId/data`,
            ...this.imageIdValidation,
            this.getImageData,
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
            console.log(file.buffer.slice(0, 10).toString("hex"));
            const response = await this.imageService.createImage(
                caption,
                userId,
                file.mimetype === "image/png" ? "png" : "jpg",
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
                        ctx.log.warn(e);
                        throw new RequestError(500);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    /**
     * Delete an image from the system.
     */
    private deleteImage = async (
        ctx: ParameterizedContext<IValidationContext, RouterContext>,
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { imageId } = ctx.params;

        try {
            await this.imageService.deleteImage(imageId);
            ctx.status = 204;
        } catch (e) {
            if (e instanceof DeleteImageError) {
                switch (e.cause) {
                    case "NOT_FOUND":
                        throw new RequestError(404, `No image found with id ${imageId}`);
                    default:
                        ctx.log.warn(e);
                        throw new RequestError(500);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    private getImageMeta = async (
        ctx: ParameterizedContext<IValidationContext, RouterContext>,
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { imageId } = ctx.params;

        try {
            const meta = await this.imageService.getImageMeta(imageId);
            ctx.status = 200;
            ctx.body = meta;
        } catch (e) {
            if (e instanceof GetImageError) {
                switch (e.status) {
                    case GetImageErrorStatus.IMAGE_NOT_FOUND:
                        throw new RequestError(404, `No image found with id ${imageId}`);
                    default:
                        ctx.log.warn(e);
                        throw new RequestError(500);
                }
            }
            ctx.log.error(e);
            throw new RequestError(503);
        }
    }

    private getImageData = async (
        ctx: ParameterizedContext<IValidationContext, RouterContext>,
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { imageId } = ctx.params;

        try {
            const data = await this.imageService.getImageData(imageId);
            const buffer = typeof data === "string"
                ? Buffer.from(data)
                : Buffer.from(data.buffer);
            ctx.body = buffer.slice(5);
            ctx.type = "image/png";
            ctx.status = 200;
            console.log(buffer.slice(0, 10).toString("hex"));
        } catch (e) {
            if (e instanceof GetImageError) {
                switch (e.status) {
                    case GetImageErrorStatus.IMAGE_NOT_FOUND:
                        throw new RequestError(404, `No image found with id ${imageId}`);
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
