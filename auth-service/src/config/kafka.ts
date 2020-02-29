import { KafkaClientOptions } from "kafka-node";
import { getProcessEnv } from "../lib/utils";

export const kafkaClientOptions: KafkaClientOptions = {
    connectTimeout: 5000,
    requestTimeout: 5000,
    kafkaHost: getProcessEnv("KAFKA_SERVERS", "localhost:29092"),
};

export const kafkaProducerConfig = {
    topic: getProcessEnv("KAFKA_ACCOUNT_TOPIC", "accounts"),
};
