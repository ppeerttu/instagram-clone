import { getProcessEnv } from "../lib/utils";

export const config = {
    env: getProcessEnv("NODE_ENV", "development"),
    port: parseInt(getProcessEnv("SERVER_PORT", "3000"), 10),
};
