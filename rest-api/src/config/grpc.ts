import { getProcessEnv } from "../lib/utils";

export const config = {
    authService: getProcessEnv("AUTH_SERVICE"),
    imageService: getProcessEnv("IMAGE_SERVICE"),
    commentService: getProcessEnv("COMMENT_SERVICE")
};
