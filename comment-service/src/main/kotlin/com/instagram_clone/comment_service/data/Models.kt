package com.instagram_clone.comment_service.data

import com.fasterxml.jackson.annotation.JsonAutoDetect
import com.fasterxml.jackson.annotation.JsonProperty

// this annotation is needed to make jacksonxml json serialization work with this kind of kotlin data class
//@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
data class CommentWrapper(
  // Mark id as _id, because mongodb needs it and wont create new field this way
  @get:JsonProperty("_id") var id: String = "",
  val userId: String = "",
  val imageId: String = "",
  val content: String = "",
  val createdAt: String = "",
  val tags: List<String> = mutableListOf(),
  val userTags: List<String> = mutableListOf()
)

/**
 * Sealed class for handling outcome state of an operation
 */
sealed class Outcome<out T: Any> {
  data class Success<out T : Any>(val value: T) : Outcome<T>()
  data class Error(val message: String, val cause: Throwable? = null) : Outcome<Nothing>()
}
