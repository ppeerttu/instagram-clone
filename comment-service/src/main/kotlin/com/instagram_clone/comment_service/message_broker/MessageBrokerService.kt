package com.instagram_clone.comment_service.message_broker

/**
 * Generic message broker service class.
 */
interface MessageBrokerService {

  /**
   * Publish an [event] to [queue].
   */
  fun publishEvent(queue: String, event: BrokerEvent)

  /**
   *  Subscribe to a [queue] and add a [handler] for the subscription
   */
  fun subscribe(queue: String, handler: (ar: DomainEvent) -> Unit)
}
