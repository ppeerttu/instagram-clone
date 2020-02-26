import {
  body,
  IValidationState,
  validationResults,
  param,
  query
} from "koa-req-validation";
import Router, { RouterContext } from "@koa/router";
import multer, { File } from "@koa/multer";

import { IController } from "./Controller";
import { ImageService } from "../client/images/ImageService";
import { RequestError } from "../lib/RequestError";
import { CreateImageError } from "../client/images/errors/CreateImageError";
import {
  CreateImageErrorStatus,
  GetImageErrorStatus,
  LikeImageResponseStatus,
  GetLikesErrorStatus
} from "../client/generated/image_service_pb";
import { DeleteImageError, GetImageError } from "../client/images/errors";
import { TagType } from "../client/models";
import { SearchImagesError } from "../client/images/errors/SearchImagesError";
import { LikeImageError } from "../client/images/errors/LikeImageError";
import { GetLikesError } from "../client/images/errors/GetLikesError";
import { AuthState } from "../middleware/authenticate";
import { CommentService } from "../client/comments/CommentService";
import {
  CreateCommentErrorStatus,
  GetCommentErrorStatus
} from "../client/generated/comment_service_pb";
import { CreateCommentError } from "../client/comments/errors/CreateCommentError";
import { GetCommentError } from "../client/comments/errors/GetCommentError";

const allowedFileTypes = ["image/png", "image/jpeg"];

const MAX_IMAGE_SIZE_BYTES = 15728640; // 15MB

const upload = multer({
  /**
   * Control on which file types we accept.
   */
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
    body("userId") // TODO: This can be retrieved from the auth servce (access token)
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
      .run()
  ];

  private pageValidation = [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page number has to be greater than 0")
      .toInt()
      .run(),
    query("size")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Page size has to be between 1 and 100")
      .toInt()
      .run()
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
      .withMessage(
        `The tag type has to be either of the values: ${tagTypes.join(", ")}`
      )
      .run()
  ];

  private likeImageValidation = [
    param("imageId")
      .isUUID()
      .withMessage("The image ID has to be an UUID")
      .run(),
    body("unlike")
      .optional()
      .isBoolean()
      .withMessage("The unlike has to be a boolean value")
      .toBoolean()
      .run()
  ];

  private getLikesValidation = [
    ...this.pageValidation,
    param("imageId")
      .isUUID()
      .withMessage("The image ID has to be an UUID")
      .run()
  ];

  private imageService: ImageService;
  private commentService: CommentService;

  public constructor(
    imageService: ImageService,
    commentService: CommentService
  ) {
    this.imageService = imageService;
    this.commentService = commentService;
  }

  bind = (router: Router, basePath = "/images"): void => {
    router.post(
      `${basePath}`,
      upload.single("image") as any, // For TSC
      ...this.createImageValidation,
      this.postImage
    );
    router.delete(
      `${basePath}/:imageId`,
      ...this.imageIdValidation,
      this.deleteImage
    );
    router.get(
      `${basePath}/:imageId/meta`,
      ...this.imageIdValidation,
      this.getImageMeta
    );
    router.get(
      `${basePath}/:imageId/data`,
      ...this.imageIdValidation,
      this.getImageData
    );
    router.get(`${basePath}`, ...this.searchValidation, this.searchImages);
    router.put(
      `${basePath}/:imageId/likes`,
      ...this.likeImageValidation,
      this.likeImage
    );
    router.get(
      `${basePath}/:imageId/likes`,
      ...this.getLikesValidation,
      this.getLikes
    );
    router.post(`${basePath}/:imageId/comments`, this.postComment);
    router.get(
      `${basePath}/:imageId/comments`,
      ...this.pageValidation,
      this.getComments
    );
  };

  /**
   * Post an image to the system.
   */
  private postImage = async (ctx: RouterContext<IValidationState>) => {
    const results = validationResults(ctx);
    const file = (ctx as any).file as File; // For TSC

    if (results.hasErrors() || !file || file.size > MAX_IMAGE_SIZE_BYTES) {
      const errors = results.array();
      if (!file) {
        errors.push({
          param: "image",
          msg: "Image file has to be set",
          value: "",
          location: "body"
        });
      } else if (file.size > MAX_IMAGE_SIZE_BYTES) {
        errors.push({
          param: "image",
          msg: "Image size too large",
          value: "",
          location: "body"
        });
      }
      throw new RequestError(422, { errors });
    }

    const { userId, caption } = ctx.request.body;

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
  };

  /**
   * Delete an image from the system.
   */
  private deleteImage = async (ctx: RouterContext<IValidationState>) => {
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
  };

  /**
   * Get image metadata.
   */
  private getImageMeta = async (ctx: RouterContext<IValidationState>) => {
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
  };

  /**
   * Get image data.
   */
  private getImageData = async (ctx: RouterContext<IValidationState>) => {
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
  };

  /**
   * Search images handler.
   */
  private searchImages = async (ctx: RouterContext<IValidationState>) => {
    const results = validationResults(ctx);
    if (results.hasErrors()) {
      throw new RequestError(422, { errors: results.array() });
    }
    // Data that has passed validation & sanitation
    const { search, type, page, size } = results.passedData();
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedSize = size ? parseInt(size, 10) : 10;
    try {
      const result = await this.imageService.searchImagesByTag(
        search,
        type,
        parsedPage,
        parsedSize
      );
      ctx.body = result;
    } catch (e) {
      if (e instanceof SearchImagesError) {
        // This should be really rare
        ctx.log.warn(e);
        throw new RequestError(500);
      }
      ctx.log.error(e);
      throw new RequestError(503);
    }
  };

  /**
   * Like about an image.
   */
  private likeImage = async (
    ctx: RouterContext<AuthState & IValidationState>
  ) => {
    const results = validationResults(ctx as any); // as any because of bad typings...
    if (results.hasErrors()) {
      throw new RequestError(422, { errors: results.array() });
    }

    const { imageId, unlike: ulike } = results.passedData();
    const unlike = typeof ulike === "boolean" ? ulike : false;
    const { id } = ctx.state.account;

    try {
      await this.imageService.likeImage(imageId, id, unlike);
      ctx.status = 204;
    } catch (e) {
      if (e instanceof LikeImageError) {
        switch (e.reason) {
          case LikeImageResponseStatus.IMAGE_NOT_FOUND_ERROR:
            throw new RequestError(404, "Image not found");
          case LikeImageResponseStatus.USER_NOT_FOUND_ERROR:
            throw new RequestError(404, "User not found");
          default:
            ctx.log.warn(e);
            throw new RequestError(500);
        }
      }
      ctx.log.error(e);
      throw new RequestError(503);
    }
  };

  /**
   * Get image likes.
   */
  private getLikes = async (ctx: RouterContext<IValidationState>) => {
    const results = validationResults(ctx);
    if (results.hasErrors()) {
      throw new RequestError(422, { errors: results.array() });
    }
    const { imageId, page, size } = results.passedData();
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedSize = size ? parseInt(size, 10) : 10;
    try {
      const likes = await this.imageService.getLikes(
        imageId,
        parsedPage,
        parsedSize
      );
      ctx.body = likes;
    } catch (e) {
      if (e instanceof GetLikesError) {
        switch (e.reason) {
          case GetLikesErrorStatus.GET_LIKES_IMAGE_NOT_FOUND:
            throw new RequestError(404, "Image not found");
          default:
            ctx.log.warn(e);
            throw new RequestError(500);
        }
      }
      ctx.log.error(e);
      throw new RequestError(503);
    }
  };

  private postComment = async (
    ctx: Router.RouterContext<AuthState & IValidationState>
  ) => {
    const results = validationResults(ctx as any);
    if (results.hasErrors()) {
      throw new RequestError(422, { errors: results.array() });
    }
    const { id } = ctx.state.account;
    const { imageId } = ctx.params;
    const { content, tags, userTags } = ctx.request.body;
    try {
      const response = await this.commentService.createComment(
        content,
        id,
        imageId,
        tags,
        userTags
      );
      ctx.body = response;
      ctx.status = 201;
    } catch (e) {
      if (e instanceof CreateCommentError) {
        switch (e.status) {
          case CreateCommentErrorStatus.CREATE_INVALID_PARAMETER:
            throw new RequestError(400, "Invalid parameters");
          case CreateCommentErrorStatus.CREATE_SERVER_ERROR:
          default:
            ctx.log.warn(e);
            throw new RequestError(500);
        }
      }
      ctx.log.error(e);
      throw new RequestError(503);
    }
  };

  private getComments = async (ctx: Router.RouterContext<IValidationState>) => {
    const results = validationResults(ctx);
    if (results.hasErrors()) {
      throw new RequestError(422, { errors: results.array() });
    }
    const { imageId } = ctx.params;
    const { page, size } = results.passedData();
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedSize = size ? parseInt(size, 10) : 10;
    try {
      const responsePage = await this.commentService.getCommentsForImage(
        imageId,
        parsedPage,
        parsedSize
      );
      ctx.body = responsePage;
      ctx.status = 200;
    } catch (e) {
      if (e instanceof GetCommentError) {
        switch (e.status) {
          case GetCommentErrorStatus.GET_NOT_FOUND:
            throw new RequestError(404, "Couldn't find image");
          case GetCommentErrorStatus.GET_SERVER_ERROR:
          default:
            ctx.log.warn(e);
            throw new RequestError(500);
        }
      }
      ctx.log.error(e);
      throw new RequestError(503);
    }
  };
}
