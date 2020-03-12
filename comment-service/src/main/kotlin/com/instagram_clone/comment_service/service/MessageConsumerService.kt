package com.instagram_clone.comment_service.service

import com.instagram_clone.comment_service.data.Outcome
import com.instagram_clone.comment_service.message_broker.DomainEvent
import com.instagram_clone.comment_service.message_broker.DomainEventType
import com.instagram_clone.comment_service.message_broker.MessageBrokerService
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory

/**
 * Class for consuming message broker events.
 */
class MessageConsumerService(private val service: CommentService,
                             private val broker: MessageBrokerService,
                             private val topic: String) {

  private val logger = LoggerFactory.getLogger("MessageConsumerService")

  init {
    broker.subscribe(topic) { handleEvent(it) }
  }

  private fun handleEvent(event: DomainEvent) {
    when (event.type) {
      DomainEventType.Created -> {
        logger.info("No implementation for Created event")
      }
      DomainEventType.Liked -> {
        logger.info("No implementation for Liked event")
      }
      DomainEventType.Deleted -> {
        val eventData = event.data as LinkedHashMap<*, *>
        val imageId = eventData["imageId"] as String
        service.deleteComments(imageId)
          .onComplete {
            if (it.succeeded()) {
              when (val result = it.result()) {
                is Outcome.Success -> {
                  val count = result.value
                  logger.info("Deleted $count comments for image $imageId")
                }
                is Outcome.Error -> {
                  logger.error("Failed to delete comments for image: $imageId")
                }
              }
            } else {
              logger.error("Something went wrong when deleting comments for $imageId", it.cause())
            }
          }
      }
    }
  }
}
