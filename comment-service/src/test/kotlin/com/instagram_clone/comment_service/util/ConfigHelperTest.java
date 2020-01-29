package com.instagram_clone.comment_service.util;

import io.vertx.core.json.JsonObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class ConfigHelperTest {

  @Test
  public void testDoubleValue_ReturnsString() {
    JsonObject mockConfig = new JsonObject();
    double testValue = 1.0;
    mockConfig.put("test", testValue);
    String expected = "1";

    String actual = ConfigHelperKt.retrieveProblematicString(mockConfig, "test");
    assertEquals(expected, actual);
  }

  @Test
  public void testStringeValue_ReturnString() {
    JsonObject mockConfig = new JsonObject();
    double testValue = 1.0;
    mockConfig.put("test", testValue);
    String expected = "1";

    String actual = ConfigHelperKt.retrieveProblematicString(mockConfig, "test");
    assertEquals(expected, actual);
  }
}
