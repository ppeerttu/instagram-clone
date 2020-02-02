// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: comment_service.proto

package com.instagram_clone.comment_service;

/**
 * Protobuf enum {@code Comment.GetCommentsByTagErrorStatus}
 */
public enum GetCommentsByTagErrorStatus
    implements com.google.protobuf.ProtocolMessageEnum {
  /**
   * <code>GET_BY_TAG_SERVER_ERROR = 0;</code>
   */
  GET_BY_TAG_SERVER_ERROR(0),
  UNRECOGNIZED(-1),
  ;

  /**
   * <code>GET_BY_TAG_SERVER_ERROR = 0;</code>
   */
  public static final int GET_BY_TAG_SERVER_ERROR_VALUE = 0;


  public final int getNumber() {
    if (this == UNRECOGNIZED) {
      throw new java.lang.IllegalArgumentException(
          "Can't get the number of an unknown enum value.");
    }
    return value;
  }

  /**
   * @deprecated Use {@link #forNumber(int)} instead.
   */
  @java.lang.Deprecated
  public static GetCommentsByTagErrorStatus valueOf(int value) {
    return forNumber(value);
  }

  public static GetCommentsByTagErrorStatus forNumber(int value) {
    switch (value) {
      case 0: return GET_BY_TAG_SERVER_ERROR;
      default: return null;
    }
  }

  public static com.google.protobuf.Internal.EnumLiteMap<GetCommentsByTagErrorStatus>
      internalGetValueMap() {
    return internalValueMap;
  }
  private static final com.google.protobuf.Internal.EnumLiteMap<
      GetCommentsByTagErrorStatus> internalValueMap =
        new com.google.protobuf.Internal.EnumLiteMap<GetCommentsByTagErrorStatus>() {
          public GetCommentsByTagErrorStatus findValueByNumber(int number) {
            return GetCommentsByTagErrorStatus.forNumber(number);
          }
        };

  public final com.google.protobuf.Descriptors.EnumValueDescriptor
      getValueDescriptor() {
    return getDescriptor().getValues().get(ordinal());
  }
  public final com.google.protobuf.Descriptors.EnumDescriptor
      getDescriptorForType() {
    return getDescriptor();
  }
  public static final com.google.protobuf.Descriptors.EnumDescriptor
      getDescriptor() {
    return com.instagram_clone.comment_service.CommentService.getDescriptor().getEnumTypes().get(0);
  }

  private static final GetCommentsByTagErrorStatus[] VALUES = values();

  public static GetCommentsByTagErrorStatus valueOf(
      com.google.protobuf.Descriptors.EnumValueDescriptor desc) {
    if (desc.getType() != getDescriptor()) {
      throw new java.lang.IllegalArgumentException(
        "EnumValueDescriptor is not for this type.");
    }
    if (desc.getIndex() == -1) {
      return UNRECOGNIZED;
    }
    return VALUES[desc.getIndex()];
  }

  private final int value;

  private GetCommentsByTagErrorStatus(int value) {
    this.value = value;
  }

  // @@protoc_insertion_point(enum_scope:Comment.GetCommentsByTagErrorStatus)
}

