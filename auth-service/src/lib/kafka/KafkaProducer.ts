import { KafkaClient, KafkaClientOptions, Producer, ProduceRequest } from "kafka-node";
import { DomainEvent } from "./types";

/**
 * Kafka producer for producing domain events into Kafka cluster.
 */
export class KafkaProducer {

    /**
     * The producer instance
     */
    private producer: Producer;

    /**
     * The Kafka client instance
     */
    private client: KafkaClient;

    /**
     * Topics which are ready; their metadata has been refreshed
     */
    private topicsReady: string[] = [];

    constructor(options: KafkaClientOptions) {
        this.client = new KafkaClient(options);
        this.producer = new Producer(this.client);
    }

    /**
     * Prepare the client for action.
     */
    public prepareClient() {
        return this.waitProducerReady();
    }

    /**
     * Publish an event for topic.
     *
     * @param topic The topic
     * @param event The event to publish
     */
    public async publish(topic: string, event: DomainEvent): Promise<ProduceRequest> {
        if (!this.topicsReady.includes(topic)) {
            await this.refreshMetadata(topic);
        }
        return this.send(topic, JSON.stringify(event));
    }

    /**
     * Wait until the producer is ready.
     */
    private waitProducerReady(): Promise<void> {
        return new Promise<void>((resolve) =>  {
            this.producer.on("ready", () => resolve());
        });
    }

    /**
     * Refresh metadata for a topic. This is related to issue #354 for kafka-node
     * package in GitHub. Metadata has to be refreshed for every topic before the
     * first message to that particular topic.
     *
     * @param topic The topic
     */
    private refreshMetadata(topic: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.client.refreshMetadata([topic], (err: Error) => {
                if (err) {
                    return reject(err);
                }
                this.topicsReady.push(topic);
                return resolve();
            });
        });
    }

    /**
     * Send a message to topic.
     *
     * @param topic The topic to which publish
     * @param message The message to publish
     */
    private send(topic: string, message: string): Promise<ProduceRequest> {
        return new Promise<ProduceRequest>((resolve, reject) => {
            this.producer.send(
                [{ topic, messages: [message] }],
                (err: Error, result: ProduceRequest) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                },
            );
        });
    }
}
