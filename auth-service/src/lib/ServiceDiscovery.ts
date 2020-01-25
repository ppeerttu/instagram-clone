import consul, { Consul } from "consul";
import { hostname } from "os";
import { v4 as uuidv4 } from "uuid";

import { config } from "../config/consul";

/**
 * Singleton class for service discovery functionality.
 */
export class ServiceDiscovery {

    /**
     * Get the actual instance.
     */
    public static getInstance(): ServiceDiscovery {
        if (!this.instance) {
            this.instance = new ServiceDiscovery();
        }
        return this.instance;
    }

    private static instance: ServiceDiscovery;

    /**
     * Name of this service
     */
    public readonly serviceName: string;

    /**
     * Unique instance ID
     */
    public readonly instanceId: string;

    /**
     * Is the service registered?
     */
    private registered: boolean = false;

    /**
     * Interaval object for heartbeat
     */
    private interval: NodeJS.Timeout | null = null;

    /**
     * Consul client
     */
    private consul: Consul;

    /**
     * Heartbeat period in seconds
     */
    private heartbeatSeconds = 10;

    private constructor() {
        this.serviceName = config.clientName;
        this.instanceId = uuidv4();
        this.consul = new consul({
            host: config.consulHost,
        });
    }

    /**
     * Is this service registered to consul?
     */
    public isRegistered(): boolean {
        return this.registered;
    }

    /**
     * Register this instance into consul.
     */
    public registerService(errorHandler: (err: Error) => any): Promise<void> {
        const options: consul.Agent.Service.RegisterOptions = {
            name: this.serviceName,
            id: this.instanceId,
            address: hostname(),
            port: 4000,
            check: {
                ttl: `${this.heartbeatSeconds}s`,
            },
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
