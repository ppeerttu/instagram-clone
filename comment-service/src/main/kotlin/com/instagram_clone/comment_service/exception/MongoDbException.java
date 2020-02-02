package com.instagram_clone.comment_service.exception;

public class MongoDbException extends DbException {

  public MongoDbException(String message) {
    super(message);
  }

  public MongoDbException(String message, Throwable cause) {
    super(message, cause);
  }
}
