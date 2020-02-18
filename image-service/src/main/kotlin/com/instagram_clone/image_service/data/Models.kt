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

/**
 * Class representing a page of image likes
 */
data class ImageLikePageWrapper(

  /**
   * Image ID
   */
  val imageId: String,

  /**
   * Page number
   */
  val page: Int,

  /**
   * Page size
   */
  val size: Int,

  /**
   * Current users count
   */
  val usersCount: Int,

  /**
   * Total count of users
   */
  val totalUsersCount: Int,

  /**
   * User IDs
   */
  val users: List<String>
)

data class UserImagesPageWrapper(

  /**
   * User ID
   */
  val userId: String,

  /**
   * Page number
   */
  val page: Int,

  /**
   * Page size
   */
  val size: Int,

  /**
   * Count of images in this page
   */
  val count: Int,

  /**
   * Total count of images for the user
   */
  val totalCount: Int,

  /**
   * Content of this page (list of image metadata)
   */
  val images: List<ImageMeta>
)

/**
 * Enum value describing image search type
 */
enum class ImageSearchType {
  HashTag,
  UserTag,
}

data class ImageSearchPageWrapper(

  /**
   * The search tag
   */
  val search: String,

  /**
   * The search type
   */
  val searchType: ImageSearchType,

  /**
   * Page number
   */
  val page: Int,

  /**
   * Page size
   */
  val size: Int,

  /**
   * Count of images in this page
   */
  val count: Int,

  /**
   * Total count of images for the user
   */
  val totalCount: Int,

  /**
   * Content of this page (list of image metadata)
   */
  val images: List<ImageMeta>
)
