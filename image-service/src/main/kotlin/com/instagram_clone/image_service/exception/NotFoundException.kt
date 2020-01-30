package com.instagram_clone.image_service.exception

/**
 * Resource not found exception
 */
class NotFoundException(
  override val message: String,
  cause: Exception? = null
) : Exception(message, cause)
