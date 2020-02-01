package com.instagram_clone.comment_service.exception;

public class InvalidParameterException extends Exception {

  public InvalidParameterException(String message) {
    super(message);
  }

  public InvalidParameterException(String message, Throwable cause) {
    super(message, cause);
  }
}
