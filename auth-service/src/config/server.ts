import { getProcessEnv } from "../lib/utils";

export const config = {
    grpcPort: parseInt(getProcessEnv("GRPC_PORT", "3000"), 10),
};
