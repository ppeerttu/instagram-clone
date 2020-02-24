package com.instagram_clone.image_service.message_broker

import io.vertx.core.json.JsonObject

/**
 * Domain event type for resources
 */
enum class DomainEventType(val stringValue: String) {
  Created("CREATED"),
  Updated("UPDATED"),
  Deleted("DELETED"),
  Liked("LIKED")
}

data class DomainEvent(
  val type: DomainEventType,
  val entity: Any
) : BrokerEvent {

  override fun jsonSerialize(): String {
    return JsonObject()
      .put("type", type.stringValue)
      .put("data", JsonObject.mapFrom(entity))
      .encode()
  }
}
