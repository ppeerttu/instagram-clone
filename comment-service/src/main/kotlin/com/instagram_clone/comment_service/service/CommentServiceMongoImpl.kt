package com.instagram_clone.comment_service.service

import com.instagram_clone.comment_service.data.CommentWrapper
import com.instagram_clone.comment_service.data.mapComment
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.mongo.MongoClient

private const val COLLECTION_COMMENTS = "comments"
private const val FIELD_ID = "_id"

class CommentServiceMongoImpl(private val client: MongoClient) : CommentService {

  private val logger = LoggerFactory.getLogger("CommentServiceMongoImpl")

  override fun createComment(content: String, userId: String, imageId: String): Future<CommentWrapper> {
    val promise = Promise.promise<CommentWrapper>()
    val comment = mapComment(content, userId, imageId)
    val asJson = JsonObject.mapFrom(comment)
    client.insert(COLLECTION_COMMENTS, asJson) {
      if (it.succeeded()) {
        promise.complete(comment)
      } else {
        promise.fail(it.cause())
      }
    }
    return promise.future()
  }

  override fun getComment(id: String): Future<CommentWrapper> {
    val promise = Promise.promise<CommentWrapper>()
    val query = JsonObject().put(FIELD_ID, id)
    client.find(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        if (it.result().isEmpty()) {
          promise.fail("1")
        } else {
          val asJson = it.result()[0]
          val mapped = asJson.mapTo(CommentWrapper::class.java)
          promise.complete(mapped)
        }
      } else {
        promise.fail("2")
      }
    }
    return promise.future()
  }

  override fun deleteComment(id: String): Future<String> {
    val promise: Promise<String> = Promise.promise()
    val query = JsonObject().put(FIELD_ID, id)
    client.removeDocument(COLLECTION_COMMENTS, query) {
      if (it.succeeded()) {
        promise.complete(id)
      } else {
        promise.fail("1")
      }
    }
    return promise.future()
  }

  override fun getCommentsByHashTag(hashTag: String?): MutableList<CommentWrapper> {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }

  override fun getCommentsByCommentHashTag(hashTag: String?): MutableList<CommentWrapper> {
    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
  }
}
