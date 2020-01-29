package com.instagram_clone.comment_service;

import static io.grpc.MethodDescriptor.generateFullMethodName;
import static io.grpc.stub.ClientCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ClientCalls.asyncClientStreamingCall;
import static io.grpc.stub.ClientCalls.asyncServerStreamingCall;
import static io.grpc.stub.ClientCalls.asyncUnaryCall;
import static io.grpc.stub.ClientCalls.blockingServerStreamingCall;
import static io.grpc.stub.ClientCalls.blockingUnaryCall;
import static io.grpc.stub.ClientCalls.futureUnaryCall;
import static io.grpc.stub.ServerCalls.asyncBidiStreamingCall;
import static io.grpc.stub.ServerCalls.asyncClientStreamingCall;
import static io.grpc.stub.ServerCalls.asyncServerStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnaryCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedStreamingCall;
import static io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall;

/**
 * <pre>
 * Comment service definition
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.15.0)",
    comments = "Source: comment_service.proto")
public final class CommentsGrpc {

  private CommentsGrpc() {}

  private static <T> io.grpc.stub.StreamObserver<T> toObserver(final io.vertx.core.Handler<io.vertx.core.AsyncResult<T>> handler) {
    return new io.grpc.stub.StreamObserver<T>() {
      private volatile boolean resolved = false;
      @Override
      public void onNext(T value) {
        if (!resolved) {
          resolved = true;
          handler.handle(io.vertx.core.Future.succeededFuture(value));
        }
      }

      @Override
      public void onError(Throwable t) {
        if (!resolved) {
          resolved = true;
          handler.handle(io.vertx.core.Future.failedFuture(t));
        }
      }

      @Override
      public void onCompleted() {
        if (!resolved) {
          resolved = true;
          handler.handle(io.vertx.core.Future.succeededFuture());
        }
      }
    };
  }

  public static final String SERVICE_NAME = "Comment.Comments";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.comment_service.CreateCommentRequest,
      com.instagram_clone.comment_service.CreateCommentResponse> getCreateCommentMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.comment_service.CreateCommentRequest,
      com.instagram_clone.comment_service.CreateCommentResponse> getCreateCommentMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.comment_service.CreateCommentRequest, com.instagram_clone.comment_service.CreateCommentResponse> getCreateCommentMethod;
    if ((getCreateCommentMethod = CommentsGrpc.getCreateCommentMethod) == null) {
      synchronized (CommentsGrpc.class) {
        if ((getCreateCommentMethod = CommentsGrpc.getCreateCommentMethod) == null) {
          CommentsGrpc.getCreateCommentMethod = getCreateCommentMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.comment_service.CreateCommentRequest, com.instagram_clone.comment_service.CreateCommentResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Comment.Comments", "CreateComment"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.comment_service.CreateCommentRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.comment_service.CreateCommentResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new CommentsMethodDescriptorSupplier("CreateComment"))
                  .build();
          }
        }
     }
     return getCreateCommentMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.comment_service.GetCommentRequest,
      com.instagram_clone.comment_service.GetCommentResponse> getGetCommentMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.comment_service.GetCommentRequest,
      com.instagram_clone.comment_service.GetCommentResponse> getGetCommentMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.comment_service.GetCommentRequest, com.instagram_clone.comment_service.GetCommentResponse> getGetCommentMethod;
    if ((getGetCommentMethod = CommentsGrpc.getGetCommentMethod) == null) {
      synchronized (CommentsGrpc.class) {
        if ((getGetCommentMethod = CommentsGrpc.getGetCommentMethod) == null) {
          CommentsGrpc.getGetCommentMethod = getGetCommentMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.comment_service.GetCommentRequest, com.instagram_clone.comment_service.GetCommentResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Comment.Comments", "GetComment"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.comment_service.GetCommentRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.comment_service.GetCommentResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new CommentsMethodDescriptorSupplier("GetComment"))
                  .build();
          }
        }
     }
     return getGetCommentMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static CommentsStub newStub(io.grpc.Channel channel) {
    return new CommentsStub(channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static CommentsBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    return new CommentsBlockingStub(channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static CommentsFutureStub newFutureStub(
      io.grpc.Channel channel) {
    return new CommentsFutureStub(channel);
  }

  /**
   * Creates a new vertx stub that supports all call types for the service
   */
  public static CommentsVertxStub newVertxStub(io.grpc.Channel channel) {
    return new CommentsVertxStub(channel);
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static abstract class CommentsImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public void createComment(com.instagram_clone.comment_service.CreateCommentRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.CreateCommentResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getCreateCommentMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public void getComment(com.instagram_clone.comment_service.GetCommentRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.GetCommentResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getGetCommentMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getCreateCommentMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.comment_service.CreateCommentRequest,
                com.instagram_clone.comment_service.CreateCommentResponse>(
                  this, METHODID_CREATE_COMMENT)))
          .addMethod(
            getGetCommentMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.comment_service.GetCommentRequest,
                com.instagram_clone.comment_service.GetCommentResponse>(
                  this, METHODID_GET_COMMENT)))
          .build();
    }
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static final class CommentsStub extends io.grpc.stub.AbstractStub<CommentsStub> {
    public CommentsStub(io.grpc.Channel channel) {
      super(channel);
    }

    public CommentsStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CommentsStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CommentsStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public void createComment(com.instagram_clone.comment_service.CreateCommentRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.CreateCommentResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getCreateCommentMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public void getComment(com.instagram_clone.comment_service.GetCommentRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.GetCommentResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetCommentMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static final class CommentsBlockingStub extends io.grpc.stub.AbstractStub<CommentsBlockingStub> {
    public CommentsBlockingStub(io.grpc.Channel channel) {
      super(channel);
    }

    public CommentsBlockingStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CommentsBlockingStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CommentsBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public com.instagram_clone.comment_service.CreateCommentResponse createComment(com.instagram_clone.comment_service.CreateCommentRequest request) {
      return blockingUnaryCall(
          getChannel(), getCreateCommentMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public com.instagram_clone.comment_service.GetCommentResponse getComment(com.instagram_clone.comment_service.GetCommentRequest request) {
      return blockingUnaryCall(
          getChannel(), getGetCommentMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static final class CommentsFutureStub extends io.grpc.stub.AbstractStub<CommentsFutureStub> {
    public CommentsFutureStub(io.grpc.Channel channel) {
      super(channel);
    }

    public CommentsFutureStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CommentsFutureStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CommentsFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.comment_service.CreateCommentResponse> createComment(
        com.instagram_clone.comment_service.CreateCommentRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getCreateCommentMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.comment_service.GetCommentResponse> getComment(
        com.instagram_clone.comment_service.GetCommentRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getGetCommentMethod(), getCallOptions()), request);
    }
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static abstract class CommentsVertxImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public void createComment(com.instagram_clone.comment_service.CreateCommentRequest request,
        io.vertx.core.Future<com.instagram_clone.comment_service.CreateCommentResponse> response) {
      asyncUnimplementedUnaryCall(getCreateCommentMethod(), CommentsGrpc.toObserver(response.completer()));
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public void getComment(com.instagram_clone.comment_service.GetCommentRequest request,
        io.vertx.core.Future<com.instagram_clone.comment_service.GetCommentResponse> response) {
      asyncUnimplementedUnaryCall(getGetCommentMethod(), CommentsGrpc.toObserver(response.completer()));
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getCreateCommentMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.comment_service.CreateCommentRequest,
                com.instagram_clone.comment_service.CreateCommentResponse>(
                  this, METHODID_CREATE_COMMENT)))
          .addMethod(
            getGetCommentMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.comment_service.GetCommentRequest,
                com.instagram_clone.comment_service.GetCommentResponse>(
                  this, METHODID_GET_COMMENT)))
          .build();
    }
  }

  /**
   * <pre>
   * Comment service definition
   * </pre>
   */
  public static final class CommentsVertxStub extends io.grpc.stub.AbstractStub<CommentsVertxStub> {
    public CommentsVertxStub(io.grpc.Channel channel) {
      super(channel);
    }

    public CommentsVertxStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected CommentsVertxStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new CommentsVertxStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create new comment
     * </pre>
     */
    public void createComment(com.instagram_clone.comment_service.CreateCommentRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.comment_service.CreateCommentResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getCreateCommentMethod(), getCallOptions()), request, CommentsGrpc.toObserver(response));
    }

    /**
     * <pre>
     * Get comment
     * </pre>
     */
    public void getComment(com.instagram_clone.comment_service.GetCommentRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.comment_service.GetCommentResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getGetCommentMethod(), getCallOptions()), request, CommentsGrpc.toObserver(response));
    }
  }

  private static final int METHODID_CREATE_COMMENT = 0;
  private static final int METHODID_GET_COMMENT = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final CommentsImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(CommentsImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_CREATE_COMMENT:
          serviceImpl.createComment((com.instagram_clone.comment_service.CreateCommentRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.CreateCommentResponse>) responseObserver);
          break;
        case METHODID_GET_COMMENT:
          serviceImpl.getComment((com.instagram_clone.comment_service.GetCommentRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.GetCommentResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static final class VertxMethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final CommentsVertxImplBase serviceImpl;
    private final int methodId;

    VertxMethodHandlers(CommentsVertxImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_CREATE_COMMENT:
          serviceImpl.createComment((com.instagram_clone.comment_service.CreateCommentRequest) request,
              (io.vertx.core.Future<com.instagram_clone.comment_service.CreateCommentResponse>) io.vertx.core.Future.<com.instagram_clone.comment_service.CreateCommentResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.CreateCommentResponse>) responseObserver).onNext(ar.result());
                  responseObserver.onCompleted();
                } else {
                  responseObserver.onError(ar.cause());
                }
              }));
          break;
        case METHODID_GET_COMMENT:
          serviceImpl.getComment((com.instagram_clone.comment_service.GetCommentRequest) request,
              (io.vertx.core.Future<com.instagram_clone.comment_service.GetCommentResponse>) io.vertx.core.Future.<com.instagram_clone.comment_service.GetCommentResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.comment_service.GetCommentResponse>) responseObserver).onNext(ar.result());
                  responseObserver.onCompleted();
                } else {
                  responseObserver.onError(ar.cause());
                }
              }));
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class CommentsBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    CommentsBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.instagram_clone.comment_service.CommentService.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Comments");
    }
  }

  private static final class CommentsFileDescriptorSupplier
      extends CommentsBaseDescriptorSupplier {
    CommentsFileDescriptorSupplier() {}
  }

  private static final class CommentsMethodDescriptorSupplier
      extends CommentsBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    CommentsMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (CommentsGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new CommentsFileDescriptorSupplier())
              .addMethod(getCreateCommentMethod())
              .addMethod(getGetCommentMethod())
              .build();
        }
      }
    }
    return result;
  }
}
