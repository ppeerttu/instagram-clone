package com.instagram_clone.image_service.service

import com.google.protobuf.ByteString
import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.exception.CaptionTooLongException
import com.instagram_clone.image_service.exception.NotFoundException

/**
 * Interface describing Image metadata persistence operations
 */
interface ImageMetaService {

  /**
   * Create image metadata.
   */
  @Throws(CaptionTooLongException::class)
  fun saveImageMeta(imageMeta: ImageMeta): ImageMeta

  /**
   * Delete image metadata.
   */
  @Throws(NotFoundException::class)
  fun deleteImage(imageId: String)

  /**
   * Get image metadata.
   */
  fun getImageMeta(imageId: String): ImageMeta?
}
