package com.instagram_clone.image_service.exception

class EmptySearchException(
  override val message: String,
  cause: Throwable? = null
) : Exception(message, cause)
