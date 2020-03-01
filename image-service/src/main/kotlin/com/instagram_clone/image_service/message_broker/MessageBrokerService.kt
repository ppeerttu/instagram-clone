package com.instagram_clone.image_service.message_broker

/**
 * Generic message broker service class.
 */
interface MessageBrokerService {

  /**
   * Publish an [event] to [queue].
   */
  fun publishEvent(queue: String, event: BrokerEvent)

  /**
   * Subscribe to given [queue].
   */
  fun subscribe(queue: String, handler: (ar: DomainEvent) -> Unit)
}
