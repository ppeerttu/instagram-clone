package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.data.ImageMeta
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
}
