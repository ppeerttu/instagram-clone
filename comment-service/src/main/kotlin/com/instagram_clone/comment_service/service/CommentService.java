package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;

public interface CommentService {

  public CommentWrapper createComment(String content, String userId, String imageId);

  public CommentWrapper getComment(String id) throws NotFoundException;

}
