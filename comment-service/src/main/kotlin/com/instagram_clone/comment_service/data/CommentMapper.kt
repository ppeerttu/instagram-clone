package com.instagram_clone.comment_service.data

import com.instagram_clone.comment_service.Comment
import com.instagram_clone.comment_service.exception.InvalidParameterException
import java.time.LocalDate
import java.util.*

@Throws(InvalidParameterException::class)
fun mapComment(content: String, userId: String, imageId: String,
               tags: List<String> , userTags: List<String> ) : CommentWrapper {
  if (content == "" || userId == "" || imageId == "") {
    throw InvalidParameterException("Invalid params, content: $content, userId: $userId, imageId: $imageId")
  }
  return CommentWrapper(
    UUID.randomUUID().toString(),
    userId,
    imageId,
    content,
    LocalDate.now().toString(),
    tags,
    userTags
  )
}

fun mapFromWrapper(comment: CommentWrapper): Comment {
  val builder = Comment.newBuilder()
  builder.setContent(comment.content)
    .setId(comment.id)
    .setImageId(comment.imageId)
    .setUserId(comment.userId)
    .setCreatedAt(comment.createdAt)
    .addAllTags(comment.tags)
    .addAllUserTags(comment.userTags)

  return builder.build()
}
