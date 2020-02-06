package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.ImageMeta
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.*

private const val FIELD_ID = "_id"

class ImageMetaServiceMongoImpl(private val client: MongoClient) : ImageMetaService {

  private val config = AppConfig.getInstance()

  override fun saveImageMeta(imageMeta: ImageMeta): Future<ImageMeta> {
    // TODO: Check that users exist
    return insertMeta(imageMeta)
  }

  override fun deleteImage(imageId: String): Future<Nothing> {
    val promise = Promise.promise<Nothing>()
    val query = JsonObject().put(FIELD_ID, imageId)

    client.findOneAndDelete(config.imagesCollection, query) {
      if (it.succeeded()) {
        promise.complete()
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  override fun getImageMeta(imageId: String): Future<ImageMeta?> {
    val promise = Promise.promise<ImageMeta?>()
    val query = JsonObject().put(FIELD_ID, imageId)

    client.findOne(config.imagesCollection, query, null) {
      if (it.succeeded()) {
        if (it.result() == null || it.result().isEmpty) {
          promise.complete(null)
        } else {
          promise.complete(it.result().mapTo(ImageMeta::class.java))
        }
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  /**
   * Insert given image metadata into the database.
   */
  private fun insertMeta(meta: ImageMeta): Future<ImageMeta> {
    val promise = Promise.promise<ImageMeta>()
    val asJson = JsonObject.mapFrom(meta)

    client.insert(config.imagesCollection, asJson) {
      if (it.succeeded()) {
        promise.complete(meta)
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }
}
