package com.instagram_clone.comment_service.service

import com.instagram_clone.comment_service.data.CommentWrapper
import com.instagram_clone.comment_service.data.Outcome
import com.instagram_clone.comment_service.data.mapComment
import com.instagram_clone.comment_service.exception.InvalidParameterException
import com.instagram_clone.comment_service.exception.MongoDbException
import com.instagram_clone.comment_service.exception.NotFoundException
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.mongo.MongoClient

private const val COLLECTION_COMMENTS = "comments"
private const val FIELD_ID = "_id"
private const val FIELD_TAGS = "tags"
private const val FIELD_USER_TAGS = "userTags"

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
}
