import http, { RequestListener, Server, ServerResponse } from "http";

export interface LivenessStatus {
    status: "OK" | "ERROR";
    message?: string;
    statusCode: number;
}

/**
 * Liveness check function to be run on every liveness check.
 */
export type LivenessCheck = () => Promise<void>;

/**
 * Kubernetes liveness manager for telling whether or not the service is healthy.
 */
export class KubeLivenessManager {

    /**
     * Node.js plain Server instance
     */
    private server: Server;

    /**
     * Checks to do on every "heartbeat"
     */
    private checks: LivenessCheck[] = [];

    /**
     * Possible server port
     */
    private port?: number;

    /**
     * Create a new liveness manager.
     *
     * @param arg1 Either plain Node.js Server or portnumber
     * @param path Health check HTTP path for GET request
     */
    constructor(private arg1: Server | number, private readonly path = "/health") {
        if (typeof arg1 === "number") {
            this.port = arg1;
            this.server = http.createServer(this.livenessCheck);
        } else {
            this.server = arg1;
        }
    }

    /**
     * Add checks for every heartbeat.
     *
     * @param checks The checks to add
     */
    public addChecks(...checks: LivenessCheck[]) {
        this.checks = [
            ...this.checks,
            ...checks,
        ];
    }

    /**
     * Start the liveness manager (HTTP server).
     */
    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.on("error", (err) => {
                reject(err);
            });
            this.server.on("listening", () => {
                resolve();
            });
            if (!this.server.listening) {
                this.server.listen(this.port!);
            }
        });
    }

    /**
     * Stop the liveness manager (HTTP server).
     */
    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Handle an incoming HTTP request.
     */
    private livenessCheck: RequestListener = (req, res) => {
        if (req.method === "GET" && req.url === this.path) {
            Promise.all(this.checks.map((check) => check()))
                .then(() => {
                    this.writeResponse({ status: "OK", statusCode: 200 }, res);
                })
                .catch((err) => {
                    this.writeResponse({ status: "ERROR", message: err.message || "Unknown error", statusCode: 503 }, res);
                });
        } else {
            res.writeHead(404);
            res.end();
        }
    }

    private writeResponse(liveness: LivenessStatus, response: ServerResponse) {
        response.writeHead(liveness.statusCode);
        response.end(JSON.stringify(liveness), "utf-8");
    }
}
