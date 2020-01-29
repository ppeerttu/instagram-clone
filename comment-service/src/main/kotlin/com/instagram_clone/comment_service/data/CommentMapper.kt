package com.instagram_clone.comment_service.data

import com.instagram_clone.comment_service.Comment
import java.time.LocalDate
import java.util.*

fun mapComment(content: String, userId: String, imageId: String) : CommentWrapper {
  return CommentWrapper(
    UUID.randomUUID().toString().replace("-", ""),
    userId,
    imageId,
    content,
    LocalDate.now().toString()
  )
}

fun mapFromWrapper(comment: CommentWrapper): Comment {
  val builder = Comment.newBuilder()
  builder.setContent(comment.content)
    .setId(comment.id)
    .setImageId(comment.imageId)
    .setUserId(comment.userId)
    .setCreatedAt(comment.createdAt)

  return builder.build()
}
