package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentMapperKt;
import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;
import io.vertx.core.Future;
import io.vertx.core.Promise;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommentServiceMockImpl implements CommentService {

  private final Map<String, CommentWrapper> store = new HashMap<>();

  @Override
  public Future<CommentWrapper> createComment(String content, String userId, String imageId) {
    Promise<CommentWrapper> promise = Promise.promise();
    CommentWrapper newComment = CommentMapperKt.mapComment(content, userId, imageId);
    store.put(newComment.getId(), newComment);
    promise.fail(new NotFoundException("test"));
    promise.complete(newComment);
    return promise.future();
  }

  @Override
  public Future<CommentWrapper> getComment(String id) {
    Promise<CommentWrapper> promise = Promise.promise();
    CommentWrapper comment = store.get(id);
    if (comment == null) {
      promise.fail("1");
    } else {
      promise.complete(comment);
    }
    return promise.future();
  }

  @Override
  public Future<String> deleteComment(String id) {
    Promise<String> promise = Promise.promise();
    if (store.containsKey(id)) {
      store.remove(id);
      promise.complete(id);
    } else {
      promise.fail("1");
    }
    return promise.future();
  }

  @Override
  public List<CommentWrapper> getCommentsByHashTag(String hashTag) {
    return new ArrayList<>(store.values());
  }

  @Override
  public List<CommentWrapper> getCommentsByCommentHashTag(String hashTag) {
    return new ArrayList<>(store.values());
  }
}
