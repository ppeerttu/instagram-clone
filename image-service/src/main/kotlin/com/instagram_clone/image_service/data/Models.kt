package com.instagram_clone.image_service.data

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

/**
 * Data class wrapping image meta data
 */
data class ImageMeta(
  /**
   * ID of the image
   */
  @get:JsonProperty("_id") var id: String = "",

  /**
   * Type of the image (e.g. img/png)
   */
  val mimeType: String = "",

  /**
   * Width in pixels
   */
  val width: Int = 0,

  /**
   * Height in pixels
   */
  val height: Int = 0,

  /**
   * User who posted the image
   */
  val userId: String = "",

  /**
   * Caption for the image
   */
  val caption: String = "",

  /**
   * Like count
   */
  var likes: Int = 0,

  /**
   * List of hash tags
   */
  var hashTags: List<String> = listOf(),

  /**
   * List of user tags
   */
  var userTags: List<String> = listOf(),

  /**
   * Created at timestamp
   */
  val createdAt: String = LocalDateTime.now().toString()
)
