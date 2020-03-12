import consul from "consul";
import { ServiceDiscovery } from "../lib/ServiceDiscovery";

/**
 * Abstract gRPC class containing logic related to service discovery.
 */
export abstract class GrpcClient {

    /**
     * The service name (e.g. auth-service)
     */
    protected abstract serviceName: string;

    /**
     * Known gRPC server endpoints
     */
    protected knownEndpoints: string[] = [];

    /**
     * Current selected gRPC server endpoint
     */
    protected currentEndpoint: string | null = null;

    /**
     * Watcher instance for watching changes in gRPC endpoints
     */
    protected watcher: consul.Watch | null = null;

    /**
     * Create a new client.
     *
     * @param staticEndpoint Static endpoint when dynamic load balancing is done elsewhere
     */
    constructor(private readonly staticEndpoint?: string) {}

    /**
     * Tear down the client
     */
    public tearDown() {
        if (this.watcher) {
            this.watcher.removeListener("change", this.updateEndpoints);
            this.watcher.end();
        }
    }

    /**
     * Bind a watcher to the gRPC service which will discover where the service is
     * available.
     *
     * @param sd The service discovery instance
     */
    public bindWatch(sd: ServiceDiscovery) {
        this.watcher = sd.getWatcher(this.serviceName);
        this.watcher.on("change", this.updateEndpoints);
        this.watcher.on("error", console.error);
    }

    /**
     * Update endpoints handler function.
     */
    private updateEndpoints = (data: any) => {
        if (Array.isArray(data)) {
            const newEndpoints = [];
            for (const entry of data) {
                if (entry.Service.Address && entry.Service.Port) {
                    newEndpoints.push(
                        `${entry.Service.Address}:${entry.Service.Port}`,
                        );
                }
            }
            this.knownEndpoints = newEndpoints;
            // Update the client if we notice that currently picked has gone away
            if (!this.currentEndpoint || !newEndpoints.includes(this.currentEndpoint)) {
                this.updateClient();
            }
        }
    }

    /**
     * Get new server endpoint for the client.
     */
    protected getNewEndpoint(): string | null {
        if (this.staticEndpoint) { // Use static endpoint always if it's configured
            return this.staticEndpoint;
        }
        const endpoints = this.knownEndpoints;
        switch (endpoints.length) {
            case 0:
                return null;
            case 1:
                return endpoints[0];
            default:
                return this.knownEndpoints[
                    Math.floor(Math.random() * endpoints.length)
                ];
        }
    }

    /**
     * Update the actual gRPC client instance.
     */
    protected abstract updateClient(): void;
}
