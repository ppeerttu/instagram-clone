package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.exception.NotFoundException
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.*
import io.vertx.kotlin.core.json.json
import io.vertx.kotlin.core.json.obj

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

  override fun likeImage(
    imageId: String,
    userId: String
  ): Future<Nothing> = getImageMeta(imageId)
    .compose { meta ->
      if (meta == null) {
        throw NotFoundException("No image found with id $imageId")
      }
      addLike(imageId, userId)
    }
    .compose { newLike ->
      // Increase like counter only if the like is "new"
      if (newLike) {
        increaseLikeCounter(imageId, 1)
      } else {
        Future.succeededFuture()
      }
    }

  override fun unlikeImage(
    imageId: String,
    userId: String
  ): Future<Nothing> = getImageMeta(imageId)
    .compose { meta ->
      if (meta == null) {
        throw NotFoundException("No image found with id $imageId")
      }
      removeLike(imageId, userId)
    }
    .compose { removed ->
      if (removed) {
        increaseLikeCounter(imageId, -1)
      } else {
        Future.succeededFuture()
      }
    }

  /**
   * Remove the like of [imageId] from [userId]. Return boolean indicating whether
   * the like actually existed or not (success in any case).
   */
  private fun removeLike(imageId: String, userId: String): Future<Boolean> {
    val promise = Promise.promise<Boolean>()

    val query = json {
      obj("imageId" to imageId, "userId" to userId)
    }

    client.findOneAndDelete(config.likesCollection, query) {
      if (it.succeeded()) {
        promise.complete(true)
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  /**
   * Add a like if it doesn't exist based on [imageId] and [userId]. Return
   * boolean describing whether new like was inserted or not (already existing).
   */
  private fun addLike(imageId: String, userId: String): Future<Boolean> {
    val promise = Promise.promise<Boolean>()
    val query = json {
      obj("imageId" to imageId, "userId" to userId)
    }
    val update = json {
      obj("\$set" to query)
    }
    client.updateCollectionWithOptions(
      config.likesCollection,
      query,
      update,
      UpdateOptions(true)
    ) {
      if (it.succeeded()) {
        val r = it.result()
        if (r.docUpsertedId != null && r.docMatched == 0L) {
          promise.complete(true)
        } else {
          promise.complete(false);
        }
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  /**
   * Increase the like counter based on [imageId], for the amount of [amount]. Please
   * note that negative [amount] values will decrease the "likes" counter.
   */
  private fun increaseLikeCounter(imageId: String, amount: Long): Future<Nothing> {
    val promise = Promise.promise<Nothing>()
    val query = JsonObject()
      .put(FIELD_ID, imageId)
    val update = json {
      obj("\$inc" to obj("likes" to amount))
    }

    client.updateCollection(config.imagesCollection, query, update) {
      if (it.succeeded()) {
        // promise.complete(it.result().docModified > 0)
        promise.complete()
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
