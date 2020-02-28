package com.instagram_clone.comment_service

import com.instagram_clone.comment_service.message_broker.DomainEvent
import com.instagram_clone.comment_service.message_broker.DomainEventType
import io.vertx.core.json.Json
import junit.framework.Assert.assertEquals
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import java.lang.Exception

@RunWith(JUnit4::class)
class DomainEventTest {

  @Test
  @Throws(Exception::class)
  fun testDeserialization_isSuccessful() {
    val testString = "{\"type\": \"DELETED\", \"data\": \"test_data\"}"
    val expectedEvent = DomainEvent(DomainEventType.Deleted, "test_data")

    val actualEvent = Json.decodeValue(testString, DomainEvent::class.java)

    assertEquals(actualEvent.type, expectedEvent.type)
    assertEquals(actualEvent.data, expectedEvent.data)
  }
}
