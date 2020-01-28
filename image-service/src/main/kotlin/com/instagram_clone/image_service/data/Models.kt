package com.instagram_clone.image_service.data

import java.util.*

/**
 * Temporary data class wrapping image meta data
 */
data class ImageMeta(
  /**
   * ID of the image
   */
  val id: String,

  /**
   * Type of the image (e.g. img/png)
   */
  val type: String,

  /**
   * Width in pixels
   */
  val width: Int,

  /**
   * Heigh in pixels
   */
  val height: Int,

  /**
   * User who posted the image
   */
  val userId: String,

  /**
   * Caption for the image
   */
  val caption: String,

  /**
   * Created at timestamp
   */
  val createdAt: Date
)
