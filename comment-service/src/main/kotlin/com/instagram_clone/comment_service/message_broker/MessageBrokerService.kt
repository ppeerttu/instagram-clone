package com.instagram_clone.comment_service.message_broker

/**
 * Generic message broker service class.
 */
interface MessageBrokerService {

  /**
   * Publish an [event] to [queue].
   */
  fun publishEvent(queue: String, event: BrokerEvent)
}
