package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.exception.NotFoundException

/**
 * Mock implementation of the [ImageMetaService].
 */
class ImageMetaServiceMockImpl : ImageMetaService {

  /**
   * In-memory list of image metadata
   */
  private val images: MutableList<ImageMeta> = mutableListOf()

  override fun saveImageMeta(imageMeta: ImageMeta): ImageMeta = imageMeta.also {
    images.add(it)
  }

  override fun deleteImage(imageId: String) {
    val meta = images.find { it.id === imageId }
    if (meta != null) {
      images.remove(meta)
    } else {
      throw NotFoundException("No image found with id $imageId")
    }
  }

  override fun getImageMeta(imageId: String): ImageMeta? = images.find { it.id === imageId }
}
