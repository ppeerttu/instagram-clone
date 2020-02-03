package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.ImageMeta
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.mongo.MongoClient

private const val FIELD_ID = "_id"

class ImageMetaServiceMongoImpl(private val client: MongoClient) : ImageMetaService {

  private val config = AppConfig.getInstance()

  private val logger = LoggerFactory.getLogger(javaClass)

  override fun saveImageMeta(imageMeta: ImageMeta): Future<ImageMeta> {
    val promise = Promise.promise<ImageMeta>()
    val asJson = JsonObject.mapFrom(imageMeta)

    client.insert(config.imagesCollection, asJson) {
      if (it.succeeded()) {
        promise.complete(imageMeta)
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
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
        if (it.result().isEmpty) {
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
}
