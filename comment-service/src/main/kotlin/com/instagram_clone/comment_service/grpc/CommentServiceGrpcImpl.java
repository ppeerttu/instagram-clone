package com.instagram_clone.comment_service.grpc;

import com.instagram_clone.comment_service.*;
import com.instagram_clone.comment_service.data.CommentMapperKt;
import com.instagram_clone.comment_service.data.CommentWrapper;
import com.instagram_clone.comment_service.exception.NotFoundException;
import com.instagram_clone.comment_service.service.CommentService;
import io.grpc.stub.StreamObserver;

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
    CommentWrapper wrap = service.createComment(content, imageId, userId);
    Comment comment = CommentMapperKt.mapFromWrapper(wrap);
    buildResponse(comment, responseObserver);
  }

  @Override
  public void getComment(GetCommentRequest request, StreamObserver<GetCommentResponse> responseObserver) {
    String id = request.getCommentId();
    GetCommentResponse.Builder builder = GetCommentResponse.newBuilder();
    try {
      CommentWrapper wrap = service.getComment(id);
      Comment comment = CommentMapperKt.mapFromWrapper(wrap);
      builder.setComment(comment);
    } catch (NotFoundException e) {
      builder.setError(GetCommentErrorStatus.NOT_FOUND);
    }
    responseObserver.onNext(builder.build());
    responseObserver.onCompleted();
  }

  private void buildResponse(Comment comment, StreamObserver<CreateCommentResponse> responseObserver) {
    CreateCommentResponse.Builder builder = CreateCommentResponse.newBuilder();
    builder.setComment(comment);
    responseObserver.onNext(builder.build());
    responseObserver.onCompleted();
  }
}
