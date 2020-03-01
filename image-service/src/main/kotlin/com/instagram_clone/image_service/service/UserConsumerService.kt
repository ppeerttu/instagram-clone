package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.message_broker.DomainEvent
import com.instagram_clone.image_service.message_broker.DomainEventType
import com.instagram_clone.image_service.message_broker.MessageBrokerService
import io.vertx.core.Future
import io.vertx.core.logging.LoggerFactory

class UserConsumerService(
  private val imageMetaService: ImageMetaService,
  private val messageBrokerService: MessageBrokerService
) {

  private val logger = LoggerFactory.getLogger("MessageConsumerService")

  private val config = AppConfig.getInstance()

  private fun handleEvent(event: DomainEvent) {
    when (event.type) {
      DomainEventType.Deleted -> {
        try {
          val data = event.data as LinkedHashMap<*, *>
          val userId = data["userId"] as String
          deleteImages(userId)
            .onSuccess {
              logger.info("Deleted images for user $userId")
            }
            .onFailure { e ->
              logger.error("Failed to delete images for user $userId, ${e.message}", e)
            }
        } catch (e: Exception) {
          logger.error("Failed to parse user id out of DomainEvent", e)
        }
      }
      else -> logger.debug("Got user event ${event.type.stringValue}")
    }
  }

  /**
   * Delete images based on [userId]. This is an asynchronous method that deletes images
   * in batches of 20 images.
   */
  private fun deleteImages(userId: String, round: Int = 1, deleteCount: Int = 0): Future<Int> {
    val page = 1
    val size = 20
    var expectedDeleteCount = 0
    var nextPage = false
    var images = listOf<ImageMeta>()
    return imageMetaService.getUserImages(userId, page, size)
      .compose { wrapper ->
        expectedDeleteCount = wrapper.images.size
        images = wrapper.images
        if (wrapper.totalCount > wrapper.count) {
          nextPage = true
        }
        imageMetaService.deleteImages(images.map { it.id })
      }
      .compose { count ->
        if (count != expectedDeleteCount) {
          logger.warn(
            "Expected delete count $expectedDeleteCount but it actually was " +
              "$count for user $userId at round $round"
          )
        }
        publishDeletedImages(images)
        if (nextPage) {
          deleteImages(userId, round + 1, deleteCount + count)
        } else {
          Future.succeededFuture<Int>(deleteCount + count)
        }
      }
  }

  /**
   * Publish deleted image events into message broker.
   */
  private fun publishDeletedImages(images: List<ImageMeta>) {
    for (image in images) {
      messageBrokerService.publishEvent(
        config.imagesTopic,
        DomainEvent(
          DomainEventType.Deleted,
          image
        )
      )
    }
  }
}
