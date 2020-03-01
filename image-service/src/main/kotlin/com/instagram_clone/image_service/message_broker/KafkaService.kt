package com.instagram_clone.image_service.message_broker

import io.vertx.core.json.DecodeException
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.kafka.client.consumer.KafkaConsumer
import io.vertx.kafka.client.producer.KafkaProducer
import io.vertx.kafka.client.producer.KafkaProducerRecord

/**
 * Kafka message broker service class.
 */
class KafkaService(
  private val producer: KafkaProducer<Nothing, String>,
  private val consumer: KafkaConsumer<Nothing, String>
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

  /**
   * Subscribe to given [queue].
   */
  override fun subscribe(queue: String, handler: (ar: DomainEvent) -> Unit) {
    consumer.subscribe(queue) {
      if (it.succeeded()) {
        consumer.handler { record ->
          try {
            val valueAsJson = JsonObject(record.value())
            val event = valueAsJson.mapTo(DomainEvent::class.java)
            handler(event)
          } catch (e: DecodeException) {
            logger.warn("Kafka consumer event received in unexpected format, ${e.message}", e)
          } catch (e: Exception) {
            logger.error("Unexpected exception while handling consumer event: ${e.message}", e)
          }
        }
      } else {
        logger.error("Failed to subscribe to queue \"$queue\"")
      }
    }
  }
}
