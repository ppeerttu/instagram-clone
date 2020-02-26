package com.instagram_clone.comment_service.message_broker


/**
 * An event that can be serialized into JSON string for message brokers.
 */
interface BrokerEvent {

  /**
   * Serialize the event into JSON string
   */
  fun jsonSerialize(): String
}
