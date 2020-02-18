package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.data.*
import io.vertx.core.Future

/**
 * Interface describing Image metadata persistence operations
 */
interface ImageMetaService {

  /**
   * Create image metadata.
   */
  fun saveImageMeta(imageMeta: ImageMeta): Future<ImageMeta>

  /**
   * Delete image metadata.
   */
  fun deleteImage(imageId: String): Future<Nothing>

  /**
   * Get image metadata.
   */
  fun getImageMeta(imageId: String): Future<ImageMeta?>

  /**
   * Add a like to an image.
   */
  fun likeImage(imageId: String, userId: String): Future<Nothing>

  /**
   * Remove a like from an image.
   */
  fun unlikeImage(imageId: String, userId: String): Future<Nothing>

  /**
   * Get image likes as a page.
   */
  fun getImageLikes(imageId: String, page: Int, size: Int): Future<ImageLikePageWrapper>

  /**
   * Get user's images as a page.
   */
  fun getUserImages(userId: String, page: Int, size: Int): Future<UserImagesPageWrapper>

  /**
   * Get images based on search tag.
   */
  fun searchImagesByTag(tag: String, page: Int, size: Int, searchType: ImageSearchType): Future<ImageSearchPageWrapper>
}
