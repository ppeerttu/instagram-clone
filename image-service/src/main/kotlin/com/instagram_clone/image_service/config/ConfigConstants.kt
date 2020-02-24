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
}
