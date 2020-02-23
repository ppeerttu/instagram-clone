package com.instagram_clone.comment_service.service

import com.instagram_clone.comment_service.data.CommentWrapper
import com.instagram_clone.comment_service.data.Outcome
import com.instagram_clone.comment_service.data.Pageable
import com.instagram_clone.comment_service.data.mapComment
import com.instagram_clone.comment_service.exception.InvalidParameterException
import com.instagram_clone.comment_service.exception.NotFoundException
import io.vertx.core.Future
import io.vertx.core.Promise
import java.util.*

class CommentServiceMockImpl : CommentService {
  private val store: MutableMap<String, CommentWrapper> = HashMap()

  override fun createComment(content: String,
                             userId: String,
                             imageId: String,
                             tags: List<String>,
                             userTags: List<String>): Future<Outcome<CommentWrapper>> {
    val promise = Promise.promise<Outcome<CommentWrapper>>()
    var newComment: CommentWrapper?
    try {
      newComment = mapComment(content, userId, imageId, tags, userTags)
    } catch (e: InvalidParameterException) {
      promise.complete(Outcome.Error(
        message = "Invalid parameters for creating comment",
        cause = e
        ))
      return promise.future()
    }
    store[newComment.id] = newComment
    promise.fail(NotFoundException("test"))
    promise.complete(Outcome.Success(newComment))
    return promise.future()
  }

  override fun getComment(id: String): Future<Outcome<CommentWrapper>> {
    val promise = Promise.promise<Outcome<CommentWrapper>>()
    val comment = store[id]
    if (comment == null) {
      promise.complete(Outcome.Error(message = "", cause = NotFoundException("Comment not found")))
    } else {
      promise.complete(Outcome.Success(comment))
    }
    return promise.future()
  }

  override fun deleteComment(id: String): Future<Outcome<String>> {
    val promise = Promise.promise<Outcome<String>>()
    if (store.containsKey(id)) {
      store.remove(id)
      promise.complete(Outcome.Success(id))
    } else {
      promise.complete(Outcome.Error(message = "", cause = NotFoundException("Comment not found")))
    }
    return promise.future()
  }

  override fun getCommentsByHashTag(hashTag: String): Future<Outcome<List<CommentWrapper?>>> {
    val promise = Promise.promise<Outcome<List<CommentWrapper?>>>()
    promise.complete(Outcome.Success(store.values.toList()))
    return promise.future()
  }

  override fun getCommentsByUserTag(hashTag: String): Future<Outcome<List<CommentWrapper?>>> {
    val promise = Promise.promise<Outcome<List<CommentWrapper?>>>()
    promise.complete(Outcome.Success(ArrayList(store.values)))
    return promise.future()
  }

  override fun getComments(imageId: String?, page: Int, count: Int): Future<Outcome<Pageable<List<CommentWrapper>>>> {
    val promise = Promise.promise<Outcome<Pageable<List<CommentWrapper>>>>()
    promise.complete(Outcome.Success(Pageable(store.values.toList(), page, count, 100)))
    return promise.future()
  }
}
