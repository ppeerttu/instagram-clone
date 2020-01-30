package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;
import io.vertx.core.Future;
import io.vertx.core.Promise;

import java.util.List;

public interface CommentService {

  public Future<CommentWrapper> createComment(String content, String userId, String imageId);

  public Future<CommentWrapper> getComment(String id);

  public Future<String> deleteComment(String id);

  public List<CommentWrapper> getCommentsByHashTag(String hashTag);

  public List<CommentWrapper> getCommentsByCommentHashTag(String hashTag);
}
