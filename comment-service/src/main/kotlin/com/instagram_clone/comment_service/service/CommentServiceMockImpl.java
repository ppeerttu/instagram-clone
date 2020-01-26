package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentMapperKt;
import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;

import java.util.HashMap;
import java.util.Map;

public class CommentServiceMockImpl implements CommentService {

  private final Map<String, CommentWrapper> store = new HashMap<>();

  @Override
  public CommentWrapper createComment(String content, String userId, String imageId) {
    CommentWrapper newComment = CommentMapperKt.mapComment(content, userId, imageId);
    store.put(newComment.getId(), newComment);
    return newComment;
  }

  @Override
  public CommentWrapper getComment(String id) throws NotFoundException {
    CommentWrapper comment = store.get(id);
    if (comment == null) {
      throw new NotFoundException("Comment not found from store!");
    } else {
      return comment;
    }
  }
}
