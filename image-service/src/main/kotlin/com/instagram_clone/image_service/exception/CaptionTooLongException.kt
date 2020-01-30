package com.instagram_clone.image_service.exception

/**
 * Thrown when image caption is too long
 */
class CaptionTooLongException(
  override val message: String,
  cause: Exception? = null
) : Exception(message, cause)
