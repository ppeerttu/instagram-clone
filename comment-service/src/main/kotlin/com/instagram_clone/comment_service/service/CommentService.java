package com.instagram_clone.comment_service.service;

import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.data.Outcome;
import com.instagram_clone.comment_service.data.Pageable;
import io.vertx.core.Future;

import java.util.List;

public interface CommentService {

  /**
   * Create a new {@link CommentWrapper}
   *
   * @param content the text of the comment
   * @param userId user id
   * @param imageId image id
   * @param tags tags
   * @param userTags tags of users
   * @return Future outcome with the created comment
   */
  public Future<Outcome<CommentWrapper>> createComment(
    String content,
    String userId,
    String imageId,
    List<String> tags,
    List<String> userTags);

  /**
   * Return a {@link CommentWrapper} by id
   *
   * @param id id of the comment
   * @return future outcome of the comment
   */
  public Future<Outcome<CommentWrapper>> getComment(String id);

  /**
   * Delete a {@link CommentWrapper} by id
   *
   * @param id id of the comment
   * @return future outcome with id of the deleted comment
   */
  public Future<Outcome<String>> deleteComment(String id);

  /**
   * Return a list of {@link CommentWrapper} by hashtag
   *
   * @param hashTag hashTag
   * @return list of the comments wrapped in a future outcome
   */
  public Future<Outcome<List<CommentWrapper>>> getCommentsByHashTag(String hashTag);

  /**
   * Return a list of {@link CommentWrapper} by user tag
   *
   * @param tag hashTag
   * @return list of the comments wrapped in a future outcome
   */
  public Future<Outcome<List<CommentWrapper>>> getCommentsByUserTag(String tag);

  /**
   * Return a paginated list of comments for an image
   *
   * @param imageId images id
   * @return list of comments wrapped in a future outcome
   */
  public Future<Outcome<Pageable<List<CommentWrapper>>>> getComments(String imageId, int page, int count);

  /**
   * Delete all comments for image.
   *
   * @param imageId images id
   * @return delete count wrapped in future outcome
   */
  public Future<Outcome<Long>> deleteComments(String imageId);
}
