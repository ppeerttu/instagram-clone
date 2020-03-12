import { getProcessEnv } from "../lib/utils";

export const config = {
    authService: getProcessEnv("AUTH_SERVICE"),
    imageService: getProcessEnv("IMAGE_SERVICE"),
    commentService: getProcessEnv("COMMENT_SERVICE"),
    userService: getProcessEnv("USER_SERVICE"),
  
    /**
     * Whether to use service names as they are, without Consul. Kubernetes has
     * service discovery built-in; no need for Consul.
     */
    useStaticEndpoints: getProcessEnv("USE_STATIC_ENDPOINTS", "false") === "true",
};
