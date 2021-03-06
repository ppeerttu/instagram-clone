// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: comment_service.proto

package com.instagram_clone.comment_service;

public interface CommentOrBuilder extends
    // @@protoc_insertion_point(interface_extends:Comment.Comment)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string id = 1;</code>
   */
  java.lang.String getId();
  /**
   * <code>string id = 1;</code>
   */
  com.google.protobuf.ByteString
      getIdBytes();

  /**
   * <code>string content = 2;</code>
   */
  java.lang.String getContent();
  /**
   * <code>string content = 2;</code>
   */
  com.google.protobuf.ByteString
      getContentBytes();

  /**
   * <code>string user_id = 3;</code>
   */
  java.lang.String getUserId();
  /**
   * <code>string user_id = 3;</code>
   */
  com.google.protobuf.ByteString
      getUserIdBytes();

  /**
   * <code>string image_id = 4;</code>
   */
  java.lang.String getImageId();
  /**
   * <code>string image_id = 4;</code>
   */
  com.google.protobuf.ByteString
      getImageIdBytes();

  /**
   * <code>string created_at = 5;</code>
   */
  java.lang.String getCreatedAt();
  /**
   * <code>string created_at = 5;</code>
   */
  com.google.protobuf.ByteString
      getCreatedAtBytes();

  /**
   * <code>repeated string tags = 6;</code>
   */
  java.util.List<java.lang.String>
      getTagsList();
  /**
   * <code>repeated string tags = 6;</code>
   */
  int getTagsCount();
  /**
   * <code>repeated string tags = 6;</code>
   */
  java.lang.String getTags(int index);
  /**
   * <code>repeated string tags = 6;</code>
   */
  com.google.protobuf.ByteString
      getTagsBytes(int index);

  /**
   * <code>repeated string userTags = 7;</code>
   */
  java.util.List<java.lang.String>
      getUserTagsList();
  /**
   * <code>repeated string userTags = 7;</code>
   */
  int getUserTagsCount();
  /**
   * <code>repeated string userTags = 7;</code>
   */
  java.lang.String getUserTags(int index);
  /**
   * <code>repeated string userTags = 7;</code>
   */
  com.google.protobuf.ByteString
      getUserTagsBytes(int index);
}
