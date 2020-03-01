package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.*
import com.instagram_clone.image_service.exception.EmptySearchException
import com.instagram_clone.image_service.exception.NotFoundException
import com.instagram_clone.image_service.message_broker.*
import io.vertx.core.CompositeFuture
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.*
import io.vertx.kotlin.core.json.json
import io.vertx.kotlin.core.json.obj
import kotlin.math.max
import kotlin.math.min

private const val FIELD_ID = "_id"
private const val MAX_PAGE_SIZE = 100

class ImageMetaServiceMongoImpl(
  private val client: MongoClient
) : ImageMetaService {

  private val config = AppConfig.getInstance()

  /**
   * Persist image metadata.
   */
  override fun saveImageMeta(imageMeta: ImageMeta): Future<ImageMeta> {
    return insertMeta(imageMeta)
  }

  /**
   * Delete image metadata.
   */
  override fun deleteImage(imageId: String): Future<Nothing> {
    return findAndDeleteImage(imageId)
  }

  override fun deleteImages(imageIds: List<String>): Future<Int> {
    val promise = Promise.promise<Int>()
    val query = json {
      obj(FIELD_ID to json {
        obj("\$in" to imageIds)
      })
    }

    client.removeDocuments(config.imagesCollection, query) {
      if (it.succeeded()) {
        val result = it.result()
        promise.complete(result.removedCount.toInt())
      } else {
        promise.fail(it.cause())
      }
    }

    return promise.future()
  }

  /**
   * Get image metadata.
   */
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
   * Like about an image.
   */
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
        increaseLikeCounter(imageId)
      } else {
        Future.succeededFuture()
      }
    }

  /**
   * Remove a like from image.
   */
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
        increaseLikeCounter(imageId, decrease = true)
      } else {
        Future.succeededFuture()
      }
    }

  /**
   * Get image likes as paginated result.
   */
  override fun getImageLikes(
    imageId: String,
    page: Int,
    size: Int
  ): Future<ImageLikePageWrapper> = getImageMeta(imageId)
    .compose { meta ->
      if (meta == null) {
        throw NotFoundException("No image found with id $imageId")
      }
      val query = json {
        obj("imageId" to imageId)
      }
      CompositeFuture.join(
        paginatedQuery(config.likesCollection, query, page, size),
        getCount(config.likesCollection, query)
      )
    }
    .compose { composite ->
      val pageResult = composite.resultAt<PaginatedQueryResults>(0)
      val count = composite.resultAt<Int>(1)
      Future.succeededFuture(
        ImageLikePageWrapper(
          imageId,
          page = pageResult.page,
          size = pageResult.size,
          usersCount =  pageResult.results.size,
          totalUsersCount = count,
          users = pageResult.results.map { it.getString("userId") }
        )
      )
    }

  /**
   * Get user's images based on given [userId], [page] and [size].
   */
  override fun getUserImages(userId: String, page: Int, size: Int): Future<UserImagesPageWrapper> {
    val query = json {
      obj("userId" to userId)
    }
    return CompositeFuture.all(
      paginatedQuery(config.imagesCollection, query, page, size),
      getCount(config.imagesCollection, query)
    )
      .compose { composite ->
        val pageResult = composite.resultAt<PaginatedQueryResults>(0)
        val count = composite.resultAt<Int>(1)
        Future.succeededFuture(
          UserImagesPageWrapper(
            userId,
            page = pageResult.page,
            size = pageResult.size,
            count = pageResult.results.size,
            totalCount = count,
            images = pageResult.results.map { it.mapTo(ImageMeta::class.java) }
          )
        )
      }
  }

  /**
   * Search images based on given [tag] and [searchType].
   */
  override fun searchImagesByTag(tag: String, page: Int, size: Int, searchType: ImageSearchType): Future<ImageSearchPageWrapper> {
    val selector = when (searchType) {
      ImageSearchType.HashTag -> "hashTags"
      ImageSearchType.UserTag -> "userTags"
    }
    val query = json {
      obj(selector to tag)
    }
    return Future.future<Nothing> {
      if (tag.isEmpty()) {
        it.fail(
          EmptySearchException("Received empty search tag: $tag")
        )
      } else {
        it.complete()
      }
    }
      .compose {
        CompositeFuture.all(
          paginatedQuery(config.imagesCollection, query, page, size),
          getCount(config.imagesCollection, query)
        )
      }
      .compose { composite ->
        val pageResults = composite.resultAt<PaginatedQueryResults>(0)
        val count = composite.resultAt<Int>(1)
        Future.succeededFuture(
          ImageSearchPageWrapper(
            tag,
            searchType,
            pageResults.page,
            pageResults.size,
            pageResults.results.size,
            count,
            pageResults.results.map { it.mapTo(ImageMeta::class.java) }
          )
        )
      }
  }

  /**
   * Find and delete metadata for given image. Returns the deleted document.
   */
  private fun findAndDeleteImage(imageId: String): Future<Nothing> {
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

  /**
   * Issue a paginated request to given [collection] with [query]. Given
   * [pageNum] is the page number (starting from 1) and [pageSize] is the page
   * size (max value is [MAX_PAGE_SIZE]). Use [sort] for sorting the results,
   * which defaults to "_id" field with desc order.
   */
  private fun paginatedQuery(
    collection: String,
    query: JsonObject,
    pageNum: Int,
    pageSize: Int,
    sort: JsonObject = json {
      obj(FIELD_ID to -1)
    }
  ): Future<PaginatedQueryResults> {
    val promise = Promise.promise<PaginatedQueryResults>()
    val page = if (pageNum < 1) 1 else pageNum // Anything between 1 and max Int value
    val size = max(min(pageSize, MAX_PAGE_SIZE), 1) // Between 1 and MAX_PAGE_SIZE
    val options = FindOptions().also {
      it.limit = size
      it.skip = (page - 1) * size
      it.sort = sort
    }
    client.findWithOptions(collection, query, options) {
      if (it.succeeded()) {
        promise.complete(PaginatedQueryResults(
          page,
          size,
          it.result()
        ))
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  /**
   * Get count of records within [collection] based on given [query].
   */
  private fun getCount(collection: String, query: JsonObject): Future<Int> {
    val promise = Promise.promise<Int>()

    client.count(collection, query) {
      if (it.succeeded()) {
        promise.complete(it.result().toInt())
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
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
          promise.complete(false)
        }
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  /**
   * Increase the like counter based on [imageId] by 1. If [decrease] is set to true, then
   * it will decrease by 1.
   */
  private fun increaseLikeCounter(imageId: String, decrease: Boolean = false): Future<Nothing> {
    val promise = Promise.promise<Nothing>()
    val query = JsonObject()
      .put(FIELD_ID, imageId)
    val update = json {
      obj("\$inc" to obj("likes" to if (decrease) -1 else 1))
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

  /**
   * Internal helper class for managing paginated query results.
   */
  private data class PaginatedQueryResults(

    /**
     * Effective page number (after sanitation)
     */
    val page: Int,

    /**
     * Effective page size (after sanitation)
     */
    val size: Int,

    /**
     * Actual list of results
     */
    val results: List<JsonObject>
  )
}
