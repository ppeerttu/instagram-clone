package com.instagram_clone.image_service.service

import io.vertx.core.Future


/**
 * Interface describing raw filesystem operations on image files.
 */
interface ImageFileService {

  /**
   * Save a new image into the disk.
   */
  fun saveImageFile(id: String, data: ByteArray): Future<Nothing>

  /**
   * Delete an image from disk.
   */
  fun deleteImageFile(id: String): Future<Nothing>

  /**
   * Get image file from disk.
   */
  fun getImageFile(id: String): Future<ByteArray>

  /**
   * Delete a batch of images from disk.
   */
  fun deleteImageFiles(ids: List<String>): Future<Int>
}
