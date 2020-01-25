import consul, { Consul } from "consul";
import { v4 as uuidv4 } from "uuid";
import { hostname } from "os";

import { config } from "../config/consul";
import { config as serverConfig } from "../config/server";

/**
 * Service discovery singleton class.
 */
export class ServiceDiscovery {

    /**
     * The singleton instance
     */
    private static instance: ServiceDiscovery;

    /**
     * Consul client
     */
    private consul: Consul;

    /**
     * Is this service registered?
     */
    private registered = false;

    /**
     * ID of this paritucular service instance
     */
    private instanceId: string;

    /**
     * Name of this service
     */
    private serviceName: string;

    /**
     * Heartbeat in seconds
     */
    private heartbeatSeconds = 10;

    /**
     * Interval instance for health check interval
     */
    private interval: NodeJS.Timeout | null = null;

    private constructor() {
        this.consul = new consul({
            host: config.consulHost
        });
        this.serviceName = config.clientName;
        this.instanceId = uuidv4();
    }

    /**
     * Get the singleton instance.
     */
    public static getInstance(): ServiceDiscovery {
        if (!this.instance) {
            this.instance = new ServiceDiscovery();
        }
        return this.instance;
    }

    /**
     * Is this instance registered?
     */
    public isRegistered(): boolean {
        return this.registered;
    }

    /**
     * Get the name of this service
     */
    public getServiceName(): string {
        return this.serviceName;
    }

    /**
     * Get ID of this instance
     */
    public getInstanceId(): string {
        return this.instanceId;
    }

    /**
     * Register this instance into consul.
     */
    public registerService(errorHandler: (err: Error) => any): Promise<void> {
        const options: consul.Agent.Service.RegisterOptions = {
            name: this.serviceName,
            id: this.instanceId,
            address: hostname(),
            port: serverConfig.port,
            check: {
                ttl: `${this.heartbeatSeconds}s`,
            }
        };
        return new Promise<void>((resolve, reject) => {
            this.consul.agent.service.register(options, (err) => {
                if (err) {
                    return reject(err);
                }
                this.registered = true;
                this.registerHeartbeat(errorHandler);
                return resolve();
            });
        });
    }

    /**
     * Deregister this intance from consul.
     */
    public deregister(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.deregisterHeartbeat();
            this.consul.agent.service.deregister(this.instanceId, (err) => {
                if (err) {
                    return reject(err);
                }
                this.registered = false;
                return resolve();
            });
        });
    }

    /**
     * Get a consul watcher for given service.
     *
     * @param service The service to watch
     * @param passing Whether to restrict the watch to only passing instances
     */
    public getWatcher(service: string, passing = true) {
        const options: consul.Health.ServiceOptions = {
            service,
            passing,
        };
        return this.consul.watch({
            method: this.consul.health.service,
            options,
        });
    }

    /**
     * Register the periodic heartbeat to consul
     */
    private registerHeartbeat(errorHandler: (err: Error) => any) {
        this.interval = setInterval(() => {
            this.consul.agent.check.pass(`service:${this.instanceId}`, (err) => {
                if (err) {
                    errorHandler(err);
                }
            });
        }, this.heartbeatSeconds * 500);
    }

    /**
     * Deregister the periodic heartbeat to consul
     */
    private deregisterHeartbeat() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;
    }
}
