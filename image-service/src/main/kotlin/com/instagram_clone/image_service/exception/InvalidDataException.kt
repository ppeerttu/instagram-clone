package com.instagram_clone.image_service.exception

/**
 * Invalid binary data for the given image
 */
class InvalidDataException(
  override val message: String,
  cause: Exception? = null
) : Exception(message, cause)
