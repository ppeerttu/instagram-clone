package com.instagram_clone.comment_service.grpc;

import com.instagram_clone.comment_service.*;
import com.instagram_clone.comment_service.data.CommentMapperKt;
import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;
import com.instagram_clone.comment_service.service.CommentService;
import io.grpc.stub.StreamObserver;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CommentServiceGrpcImpl extends CommentsGrpc.CommentsImplBase {

  com.instagram_clone.comment_service.service.CommentService service;

  public CommentServiceGrpcImpl(CommentService service) {
    this.service = service;
  }

  @Override
  public void createComment(CreateCommentRequest request, StreamObserver<CreateCommentResponse> responseObserver) {
    String content = request.getComment();
    String imageId = request.getImageId();
    String userId = request.getUserId();
    List<String> tags = request.getTagsList();
    List<String> userTags = request.getUserTagsList();

    service.createComment(content, imageId, userId, tags, userTags).setHandler(ar -> {
      if (ar.succeeded()) {
        CommentWrapper wrapper = ar.result();
        Comment comment = CommentMapperKt.mapFromWrapper(wrapper);
        buildResponse(comment, responseObserver);
      } else {

      }
    });
  }

  @Override
  public void getComment(GetCommentRequest request, StreamObserver<GetCommentResponse> responseObserver) {
    String id = request.getCommentId();
    GetCommentResponse.Builder builder = GetCommentResponse.newBuilder();
    service.getComment(id).setHandler(ar -> {
      if (ar.succeeded()) {
        Comment comment = CommentMapperKt.mapFromWrapper(ar.result());
        builder.setComment(comment);
      } else {
        builder.setError(GetCommentErrorStatus.GET_NOT_FOUND);
      }
      responseObserver.onNext(builder.build());
      responseObserver.onCompleted();

    });
  }

  @Override
  public void deleteComment(DeleteCommentRequest request, StreamObserver<DeleteCommentResponse> responseObserver) {
    String id = request.getCommentId();
    DeleteCommentResponse.Builder builder = DeleteCommentResponse.newBuilder();
    service.deleteComment(id).setHandler(ar -> {
      if (ar.succeeded()) {
        String deletedId = ar.result();
        builder.setCommentId(deletedId);
      } else {
        builder.setError(DeleteCommentErrorStatus.DELETE_NOT_FOUND);
      }
      responseObserver.onNext(builder.build());
      responseObserver.onCompleted();
    });
  }

  @Override
  public void getCommentsByTag(GetCommentsByTagRequest request, StreamObserver<GetCommentsByTagResponse> responseObserver) {
    String tag = request.getTag();
    GetCommentsByTagResponse.Builder builder = GetCommentsByTagResponse.newBuilder();
    service.getCommentsByHashTag(tag).setHandler(ar -> {
      if (ar.succeeded()) {
        List<CommentWrapper> returnList = ar.result();
        List<Comment> mapped = returnList.stream().map(CommentMapperKt::mapFromWrapper)
          .collect(Collectors.toList());
        builder.setComments(CommentList.newBuilder().addAllComments(mapped).build());
      } else {
        builder.setError(GetCommentsByTagErrorStatus.GET_BY_TAG_SERVER_ERROR);
      }
      responseObserver.onNext(builder.build());
      responseObserver.onCompleted();
    });
  }

  @Override
  public void getCommentsByUserTag(GetCommentsByUserTagRequest request, StreamObserver<GetCommentsByUserTagResponse> responseObserver) {
    String tag = request.getTag();
    GetCommentsByUserTagResponse.Builder builder = GetCommentsByUserTagResponse.newBuilder();
    service.getCommentsByUserTag(tag).setHandler(ar -> {
      if (ar.succeeded()) {
        List<CommentWrapper> returnList = ar.result();
        List<Comment> mapped = returnList.stream().map(CommentMapperKt::mapFromWrapper)
          .collect(Collectors.toList());
        builder.setComments(CommentList.newBuilder().addAllComments(mapped).build());
      } else {
        builder.setError(GetCommentsByTagErrorStatus.GET_BY_TAG_SERVER_ERROR);
      }
      responseObserver.onNext(builder.build());
      responseObserver.onCompleted();
    });
  }

  private void buildResponse(Comment comment, StreamObserver<CreateCommentResponse> responseObserver) {
    CreateCommentResponse.Builder builder = CreateCommentResponse.newBuilder();
    builder.setComment(comment);
    responseObserver.onNext(builder.build());
    responseObserver.onCompleted();
  }
}
