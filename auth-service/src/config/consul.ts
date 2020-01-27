import { getProcessEnv } from "../lib/utils";

export const config = {
    consulHost: getProcessEnv("CONSUL_HOST"),
    clientName: getProcessEnv("CONSUL_CLIENT_NAME", "auth-service"),
};
