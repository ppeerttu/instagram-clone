package com.instagram_clone.image_service.message_broker

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

  @JsonProperty("LIKED")
  Liked("LIKED"),

  @JsonProperty("NOT_SET")
  NotSet("NOT_SET")
}

data class DomainEvent(
  val type: DomainEventType = DomainEventType.NotSet,
  val data: Any = ""
) : BrokerEvent {

  override fun jsonSerialize(): String {
    return JsonObject()
      .put("type", type.stringValue)
      .put("data", JsonObject.mapFrom(data))
      .encode()
  }
}
