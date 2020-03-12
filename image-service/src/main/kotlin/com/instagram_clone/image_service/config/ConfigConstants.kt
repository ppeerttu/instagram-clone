package com.instagram_clone.image_service.config

/**
 * Known constant configuration key values
 */
object ConfigConstants {

  /**
   * Application gRPC host
   */
  const val GRPC_HOST = "GRPC_HOST"

  /**
   * Application gRPC port
   */
  const val GRPC_PORT = "GRPC_PORT"

  /**
   * Directory for storing image files
   */
  const val IMAGE_DATA_DIR = "IMAGE_DATA_DIR"

  /**
   * Service discovery host
   */
  const val CONSUL_HOST = "CONSUL_HOST"

  /**
   * Consul enabled flag
   */
  const val CONSUL_ENABLED = "CONSUL_ENABLED"

  /**
   * Service discovery port
   */
  const val CONSUL_PORT = "CONSUL_PORT"

  /**
   * MongoDB username
   */
  const val MONGO_USER = "MONGO_USER"

  /**
   * MongoDB password
   */
  const val MONGO_PASSWORD = "MONGO_PASSWORD"

  /**
   * MongoDB database name
   */
  const val MONGO_DATABASE = "MONGO_DATABASE"

  /**
   * MongoDB images collection
   */
  const val IMAGES_COLLECTION = "IMAGES_COLLECTION"

  /**
   * MongoDB likes collection
   */
  const val LIKES_COLLECTION = "LIKES_COLLECTION"

  /**
   * MongoDB host
   */
  const val MONGO_HOST = "MONGO_HOST"

  /**
   * MongoDB port
   */
  const val MONGO_PORT = "MONGO_PORT"

  /**
   * Kafka servers value in form of "<host>:<port>"
   */
  const val KAFKA_SERVERS = "KAFKA_SERVERS"

  /**
   * Kafka topic for image events
   */
  const val IMAGES_TOPIC = "IMAGES_TOPIC"

  /**
   * Kafka topic for user events
   */
  const val USERS_TOPIC = "USERS_TOPIC"

  /**
   * Name / ID of the Kafka consumer group
   */
  const val KAFKA_CONSUMER_GROUP = "KAFKA_CONSUMER_GROUP"

  /**
   * Web server port (e.g. health check API)
   */
  const val WEB_SERVER_PORT = "WEB_SERVER_PORT"
}
