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

  /**
   * MongoDB user
   */
  var mongoUser: String
    private set

  /**
   * MongoDB password
   */
  var mongoPassword: String
    private set

  /**
   * MongoDB host
   */
  var mongoHost: String
    private set

  /**
   * MongoDB port
   */
  var mongoPort: Int
    private set

  /**
   * MongoDB database name
   */
  var mongoDatabase: String
    private set

  /**
   * MongoDB images collection
   */
  var imagesCollection: String
    private set

  /**
   * MongoDB image likes collection
   */
  var likesCollection: String
    private set

  /**
   * Kafka servers value in form of "<host>:<port>"
   */
  var kafkaServers: String
    private set

  /**
   * Kafka topic for images
   */
  var imagesTopic: String
    private set

  init {
    grpcHost = json.getString(ConfigConstants.GRPC_HOST)
    grpcPort = json.getInteger(ConfigConstants.GRPC_PORT)
    imageDataDir = json.getString(ConfigConstants.IMAGE_DATA_DIR)
    consulHost = json.getString(ConfigConstants.CONSUL_HOST)
    consulPort = json.getInteger(ConfigConstants.CONSUL_PORT)
    mongoUser = json.getString(ConfigConstants.MONGO_USER)
    mongoPassword = json.getString(ConfigConstants.MONGO_PASSWORD)
    mongoHost = json.getString(ConfigConstants.MONGO_HOST, "127.0.0.1")
    mongoPort = json.getInteger(ConfigConstants.MONGO_PORT, 27017)
    mongoDatabase = json.getString(ConfigConstants.MONGO_DATABASE)
    imagesCollection = json.getString(ConfigConstants.IMAGES_COLLECTION, "image_meta")
    likesCollection = json.getString(ConfigConstants.LIKES_COLLECTION, "image_likes")
    kafkaServers = json.getString(ConfigConstants.KAFKA_SERVERS)
    imagesTopic = json.getString(ConfigConstants.IMAGES_TOPIC, "images")
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
