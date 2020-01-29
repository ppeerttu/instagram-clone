package com.instagram_clone.comment_service.util

import io.vertx.core.json.JsonObject
import java.lang.ClassCastException

/**
 * This function is used in cases where the config.json has values as strings
 * and for some reason the same values read from env variables in docker container
 * turn to doubles.
 */
fun retrieveProblematicString(config: JsonObject, key: String) : String {
  return try {
    config.getString(key)
  } catch (e: ClassCastException) {
    config.getDouble(key).toString().substringBeforeLast(".")
  }
}
