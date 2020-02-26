package com.instagram_clone.comment_service.message_broker

import io.vertx.core.logging.LoggerFactory
import io.vertx.kafka.client.producer.KafkaProducer
import io.vertx.kafka.client.producer.KafkaProducerRecord

/**
 * Kafka message broker service class.
 */
class KafkaService(
  private val producer: KafkaProducer<Nothing, String>
) : MessageBrokerService {

  private val logger = LoggerFactory.getLogger("KafkaService")

  /**
   * Publish the given [event] into the given [queue].
   */
  override fun publishEvent(queue: String, event: BrokerEvent) {
    // Note that in Kafka, queue is called topic
    val record = KafkaProducerRecord.create<Nothing, String>(queue, event.jsonSerialize())
    logger.debug("Writing message to topic $queue: ${event.jsonSerialize()}")
    producer.send(record) {
      if (!it.succeeded()) {
        logger.error("Failed to publish event to kafka topic $queue", it.cause())
      }
    }
  }
}
