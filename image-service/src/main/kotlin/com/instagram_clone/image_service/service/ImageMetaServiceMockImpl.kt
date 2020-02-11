package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.exception.NotFoundException
import io.vertx.core.Future
import io.vertx.core.Promise

/**
 * Mock implementation of the [ImageMetaService].
 */
class ImageMetaServiceMockImpl : ImageMetaService {

  /**
   * In-memory list of image metadata
   */
  private val images: MutableList<ImageMeta> = mutableListOf()

  /**
   * In-memory map of image likes <imageId, [userId, userId, userId, ...]>
   */
  private val likes: MutableMap<String, MutableSet<String>> = mutableMapOf()

  override fun saveImageMeta(imageMeta: ImageMeta): Future<ImageMeta> = Promise.promise<ImageMeta>().let {
    it.complete(imageMeta.also { meta -> images.add(meta)})
    it.future()
  }
  override fun deleteImage(imageId: String): Future<Nothing> = Promise.promise<Nothing>().let {
    val meta = images.find { image -> image.id == imageId }
    if (meta != null) {
      images.remove(meta)
      it.complete()
    } else {
      it.fail(NotFoundException("No image found with id $imageId"))
    }
    it.future()
  }

  override fun getImageMeta(imageId: String): Future<ImageMeta?> = Promise.promise<ImageMeta?>().let {
    it.complete(images.find { image -> image.id == imageId })
    it.future()
  }

  override fun likeImage(imageId: String, userId: String): Future<Nothing> = Promise.promise<Nothing>().let {
    val meta = images.find { image -> image.id == imageId }
    if (meta == null) {
      it.fail(NotFoundException("No image found with id $imageId"))
    } else {
      val imageLikes = likes[imageId] ?: mutableSetOf()
      imageLikes.add(userId)
      likes[imageId] = imageLikes
      it.complete()
    }
    it.future()
  }

  override fun unlikeImage(imageId: String, userId: String): Future<Nothing> = Promise.promise<Nothing>().let {
    val meta = images.find { image -> image.id == imageId }
    if (meta == null) {
      it.fail(NotFoundException("No image found with id $imageId"))
    } else {
      likes[imageId]?.remove(userId)
      it.complete()
    }
    it.future()
  }
}
