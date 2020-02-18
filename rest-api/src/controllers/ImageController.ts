import { body, IValidationState, validationResults, param, query } from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";
import multer, { File } from "@koa/multer";

import { IController } from "./Controller";
import { ImageService } from "../client/images/ImageService";
import { RequestError } from "../lib/RequestError";
import { CreateImageError } from "../client/images/errors/CreateImageError";
import { CreateImageErrorStatus, GetImageErrorStatus, SearchImagesErrorStatus } from "../client/generated/image_service_pb";
import { DeleteImageError, GetImageError } from "../client/images/errors";
import { TagType } from "../client/models";
import { SearchImagesError } from "../client/images/errors/SearchImagesError";
import { isContext } from "vm";

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

const tagTypes: TagType[] = ["hash-tag", "user-tag"];

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

    private pageValidation = [
        query("page")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Page number has to be greater than 0")
            .run(),
        query("size")
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage("Page size has to be between 1 and 100")
            .run(),
    ];

    private searchValidation = [
        ...this.pageValidation,
        query("search")
            .trim()
            .isLength({ min: 3 })
            .withMessage(
                "Please specify search string that is at least 3 characters long"
            )
            .run(),
        query("type")
            .isIn(tagTypes)
            .withMessage(`The tag type has to be either of the values: ${tagTypes.join(", ")}`)
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
        router.get(
            `${basePath}`,
            ...this.searchValidation,
            this.searchImages,
        );
    }

    /**
     * Post an image to the system.
     */
    private postImage = async (
        ctx: RouterContext<IValidationState>,
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
                file.mimetype === "image/png" ? "png" : "jpeg",
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
        ctx: RouterContext<IValidationState>,
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

    /**
     * Get image metadata.
     */
    private getImageMeta = async (
        ctx: RouterContext<IValidationState>,
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

    /**
     * Get image data.
     */
    private getImageData = async (
        ctx: RouterContext<IValidationState>,
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { imageId } = ctx.params;

        try {
            const { type, data } = await this.imageService.getImageData(imageId);
            ctx.body = Buffer.from(data);
            ctx.type = `image/${type}`;
            ctx.status = 200;
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

    /**
     * Search images handler.
     */
    private searchImages = async (
        ctx: RouterContext<IValidationState>,
    ) => {
        const results = validationResults(ctx);
        if (results.hasErrors()) {
            throw new RequestError(422, { errors: results.array() });
        }
        const { search, type } = results.passedData();
        const page = ctx.query.page
            ? parseInt(ctx.query.page, 10)
            : 1;
        const size = ctx.query.size
            ? parseInt(ctx.query.size, 10)
            : 10;
        try {
            const result = await this.imageService.searchImagesByTag(
                search,
                type,
                page,
                size,
            );
            ctx.body = result;
        } catch (e) {
            if (e instanceof SearchImagesError) {
                // This should be really rare
                ctx.log.error("Failed to search images", e);
                throw new RequestError(500);
            }
            throw new RequestError(503);
        }
    }
}
