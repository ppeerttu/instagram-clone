package com.instagram_clone.image_service.config

import io.vertx.core.json.JsonObject

/**
 * Singleton class containing the application configuration properties.
 */
class AppConfig private constructor(json: JsonObject) {

  /**
   * gRPC server host
   */
  var host: String
    private set

  /**
   * gRPC server port
   */
  var port: Int = 0
    private set

  /**
   * Image data directory
   */
  var imageDataDir: String
    private set


  init {
    host = json.getString(ConfigConstants.HOST)
    port = json.getInteger(ConfigConstants.PORT)
    imageDataDir = json.getString(ConfigConstants.IMAGE_DATA_DIR)
  }

  companion object {

    private var instance: AppConfig? = null

    fun getInstance(json: JsonObject? = null): AppConfig = when (instance) {
      null -> {
        if (json == null) {
          throw Exception("Cannot get AppConfig instance with empty config")
        } else {
          instance = AppConfig(json)
          instance!!
        }
      }
      else -> instance!!
    }
  }
}
