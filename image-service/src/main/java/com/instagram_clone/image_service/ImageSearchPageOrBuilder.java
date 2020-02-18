// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: image_service.proto

package com.instagram_clone.image_service;

public interface ImageSearchPageOrBuilder extends
    // @@protoc_insertion_point(interface_extends:Image.ImageSearchPage)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string hash_tag = 1;</code>
   */
  java.lang.String getHashTag();
  /**
   * <code>string hash_tag = 1;</code>
   */
  com.google.protobuf.ByteString
      getHashTagBytes();

  /**
   * <code>string user_tag = 2;</code>
   */
  java.lang.String getUserTag();
  /**
   * <code>string user_tag = 2;</code>
   */
  com.google.protobuf.ByteString
      getUserTagBytes();

  /**
   * <pre>
   * Page size (e.g. 20); guaranteed maximum of retrieved images
   * </pre>
   *
   * <code>int32 size = 3;</code>
   */
  int getSize();

  /**
   * <pre>
   * Page number (e.g. 2)
   * </pre>
   *
   * <code>int32 page = 4;</code>
   */
  int getPage();

  /**
   * <pre>
   * Count of images in this response
   * </pre>
   *
   * <code>int32 count = 5;</code>
   */
  int getCount();

  /**
   * <pre>
   * Total count of results for the given search
   * </pre>
   *
   * <code>int32 total_count = 6;</code>
   */
  int getTotalCount();

  /**
   * <pre>
   * Array of images; less than or equal to "size"
   * </pre>
   *
   * <code>repeated .Image.Image images = 7;</code>
   */
  java.util.List<com.instagram_clone.image_service.Image> 
      getImagesList();
  /**
   * <pre>
   * Array of images; less than or equal to "size"
   * </pre>
   *
   * <code>repeated .Image.Image images = 7;</code>
   */
  com.instagram_clone.image_service.Image getImages(int index);
  /**
   * <pre>
   * Array of images; less than or equal to "size"
   * </pre>
   *
   * <code>repeated .Image.Image images = 7;</code>
   */
  int getImagesCount();
  /**
   * <pre>
   * Array of images; less than or equal to "size"
   * </pre>
   *
   * <code>repeated .Image.Image images = 7;</code>
   */
  java.util.List<? extends com.instagram_clone.image_service.ImageOrBuilder> 
      getImagesOrBuilderList();
  /**
   * <pre>
   * Array of images; less than or equal to "size"
   * </pre>
   *
   * <code>repeated .Image.Image images = 7;</code>
   */
  com.instagram_clone.image_service.ImageOrBuilder getImagesOrBuilder(
      int index);

  public com.instagram_clone.image_service.ImageSearchPage.SearchCase getSearchCase();
}
