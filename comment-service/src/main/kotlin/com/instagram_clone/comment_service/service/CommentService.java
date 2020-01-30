package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;
import io.vertx.core.Future;
import io.vertx.core.Promise;

import java.util.List;

public interface CommentService {

  public Future<CommentWrapper> createComment(
    String content,
    String userId,
    String imageId,
    List<String> tags,
    List<String> userTags);

  public Future<CommentWrapper> getComment(String id);

  public Future<String> deleteComment(String id);

  public Future<List<CommentWrapper>> getCommentsByHashTag(String hashTag);

  public Future<List<CommentWrapper>> getCommentsByUserTag(String tag);
}
