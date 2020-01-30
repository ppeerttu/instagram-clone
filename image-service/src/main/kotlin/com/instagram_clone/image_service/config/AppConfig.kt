package com.instagram_clone.image_service.config

import io.vertx.core.json.JsonObject

/**
 * Singleton class containing the application configuration properties.
 */
class AppConfig private constructor(json: JsonObject) {

  /**
   * gRPC server host
   */
  var grpcHost: String
    private set

  /**
   * gRPC server port
   */
  var grpcPort: Int = 0
    private set

  /**
   * Image data directory
   */
  var imageDataDir: String
    private set

  /**
   * Consul host
   */
  var consulHost: String
    private set

  /**
   * Consul port
   */
  var consulPort: Int = 0
    private set

  init {
    grpcHost = json.getString(ConfigConstants.GRPC_HOST)
    grpcPort = json.getInteger(ConfigConstants.GRPC_PORT)
    imageDataDir = json.getString(ConfigConstants.IMAGE_DATA_DIR)
    consulHost = json.getString(ConfigConstants.CONSUL_HOST)
    consulPort = json.getInteger(ConfigConstants.CONSUL_PORT)
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
