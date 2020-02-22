package com.instagram_clone.comment_service.service

import com.instagram_clone.comment_service.data.CommentWrapper
import com.instagram_clone.comment_service.data.Outcome
import com.instagram_clone.comment_service.data.Pageable
import com.instagram_clone.comment_service.data.mapComment
import com.instagram_clone.comment_service.exception.InvalidParameterException
import com.instagram_clone.comment_service.exception.MongoDbException
import com.instagram_clone.comment_service.exception.NotFoundException
import io.vertx.core.CompositeFuture
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.mongo.FindOptions
import io.vertx.ext.mongo.MongoClient
import io.vertx.kotlin.core.json.json
import io.vertx.kotlin.core.json.obj
import java.lang.Integer.max
import java.lang.Integer.min

private const val COLLECTION_COMMENTS = "comments"
private const val FIELD_ID = "_id"
private const val FIELD_TAGS = "tags"
private const val FIELD_USER_TAGS = "userTags"
private const val FIELD_IMAGE_ID = "imageId"

const val MAX_PAGE_SIZE = 100;

class CommentServiceMongoImpl(private val client: MongoClient) : CommentService {

  private val logger = LoggerFactory.getLogger("CommentServiceMongoImpl")

  override fun createComment(content: String,
                             userId: String,
                             imageId: String,
                             tags: List<String>,
                             userTags: List<String>): Future<Outcome<CommentWrapper>> {
    val promise = Promise.promise<Outcome<CommentWrapper>>()


    val comment = try {
      mapComment(content, userId, imageId, tags, userTags)
    } catch (e: InvalidParameterException) {
      promise.complete(Outcome.Error(message = "Invalid parameters given for comment",
        cause = e))
      return promise.future()
    }
    val asJson = JsonObject.mapFrom(comment)
    client.insert(COLLECTION_COMMENTS, asJson) {
      if (it.succeeded()) {
        promise.complete(Outcome.Success(comment))
      } else {
        promise.complete(Outcome.Error(message = "Error in database when creating comment",
          cause = it.cause()))
      }
    }
    return promise.future()
  }

  override fun getComment(id: String): Future<Outcome<CommentWrapper>> {
    val promise = Promise.promise<Outcome<CommentWrapper>>()
    val query = JsonObject().put(FIELD_ID, id)
    client.find(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        if (it.result().isEmpty()) {
          promise.complete(Outcome.Error("Failed to find comment $id",
            NotFoundException("Couldn't find comment")))
        } else {
          val asJson = it.result()[0]
          val mapped = asJson.mapTo(CommentWrapper::class.java)
          promise.complete(Outcome.Success(mapped))
        }
      } else {
        logger.error("Failure when returning comment $id")
        promise.complete(Outcome.Error("Failure when getting comment $id",
          MongoDbException("Failed to get comment $id", it.cause())))
      }
    }
    return promise.future()
  }

  override fun deleteComment(id: String): Future<Outcome<String>> {
    val promise: Promise<Outcome<String>> = Promise.promise()
    val query = JsonObject().put(FIELD_ID, id)
    client.removeDocument(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        promise.complete(Outcome.Success(id))
      } else {
        logger.error("Failure when deleting comment $id")
        promise.complete(Outcome.Error("Failure when deleting comment $id",
          MongoDbException("Failed to delete comment $id", it.cause())))
      }
    }
    return promise.future()
  }

  override fun getCommentsByHashTag(hashTag: String): Future<Outcome<List<CommentWrapper>>> {
    val promise: Promise<Outcome<List<CommentWrapper>>> = Promise.promise()
    val query = JsonObject().put(FIELD_TAGS, hashTag)
    client.find(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        val json = it.result()
        val mapped = json.map { i -> i.mapTo(CommentWrapper::class.java) }
        promise.complete(Outcome.Success(mapped))
      } else {
        promise.complete(Outcome.Error("Failure when finding comments for tag $hashTag",
          MongoDbException("Failed to find comments by tag", it.cause())))
      }
    }
    return promise.future()
  }

  override fun getCommentsByUserTag(tag: String): Future<Outcome<List<CommentWrapper>>> {
    val promise: Promise<Outcome<List<CommentWrapper>>> = Promise.promise()
    val query = JsonObject().put(FIELD_USER_TAGS, tag)
    client.find(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        val json = it.result()
        val mapped = json.map { i -> i.mapTo(CommentWrapper::class.java) }
        promise.complete(Outcome.Success(mapped))
      } else {
        logger.error("Failed to find comments by user, cause: ${it.cause().message}", it.cause())
        promise.complete(Outcome.Error("Failure when finding comments for user $tag",
          MongoDbException("Failed to find comments by userTag", it.cause())))
      }
    }
    return promise.future()
  }

  override fun getComments(imageId: String, page: Int, count: Int): Future<Outcome<Pageable<List<CommentWrapper>>>> {
    val promise: Promise<Outcome<Pageable<List<CommentWrapper>>>> = Promise.promise()
    val query = JsonObject().put(FIELD_IMAGE_ID, imageId)

    CompositeFuture.all(
      paginatedQuery(COLLECTION_COMMENTS, query, page, count),
      getCount(COLLECTION_COMMENTS, query)
    ).onSuccess { ar ->
      val pageResults = ar.resultAt<PaginatedQueryResults>(0)
      val totalCount = ar.resultAt<Int>(1)
      val mappedResults = pageResults.results.map { it.mapTo(CommentWrapper::class.java) }
      val pagedResult = Pageable(mappedResults, pageResults.page, pageResults.size, totalCount)
      promise.complete(Outcome.Success(pagedResult))
    }
      .onFailure { e ->
        logger.error("Failed to retrieve comments for" +
          " image $imageId, with page $page, count $count, cause: ${e.message}", e)
        promise.complete(Outcome.Error("Failed to get comments", e))
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
