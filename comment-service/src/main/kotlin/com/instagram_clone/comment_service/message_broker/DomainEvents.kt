package com.instagram_clone.comment_service.message_broker

import com.fasterxml.jackson.annotation.JsonProperty
import io.vertx.core.json.JsonObject

/**
 * Domain event type for resources
 */
enum class DomainEventType(val stringValue: String) {
  @JsonProperty("CREATED")
  Created("CREATED"),
  @JsonProperty("DELETED")
  Deleted("DELETED"),
}

data class DomainEvent(
  val type: DomainEventType = DomainEventType.Created,
  val data: Any = ""
) : BrokerEvent {

  override fun jsonSerialize(): String {
    return JsonObject()
      .put("type", type.stringValue)
      .put("data", JsonObject.mapFrom(data))
      .encode()
  }
}
