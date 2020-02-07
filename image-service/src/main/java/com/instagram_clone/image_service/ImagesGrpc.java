package com.instagram_clone.image_service;

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
 * Service that is exposed via gRPC
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.15.0)",
    comments = "Source: image_service.proto")
public final class ImagesGrpc {

  private ImagesGrpc() {}

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

  public static final String SERVICE_NAME = "Image.Images";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.CreateImageRequest,
      com.instagram_clone.image_service.CreateImageResponse> getCreateImageMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.CreateImageRequest,
      com.instagram_clone.image_service.CreateImageResponse> getCreateImageMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.CreateImageRequest, com.instagram_clone.image_service.CreateImageResponse> getCreateImageMethod;
    if ((getCreateImageMethod = ImagesGrpc.getCreateImageMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getCreateImageMethod = ImagesGrpc.getCreateImageMethod) == null) {
          ImagesGrpc.getCreateImageMethod = getCreateImageMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.CreateImageRequest, com.instagram_clone.image_service.CreateImageResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.CLIENT_STREAMING)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "CreateImage"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.CreateImageRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.CreateImageResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("CreateImage"))
                  .build();
          }
        }
     }
     return getCreateImageMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.DeleteImageRequest,
      com.instagram_clone.image_service.DeleteImageResponse> getDeleteImageMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.DeleteImageRequest,
      com.instagram_clone.image_service.DeleteImageResponse> getDeleteImageMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.DeleteImageRequest, com.instagram_clone.image_service.DeleteImageResponse> getDeleteImageMethod;
    if ((getDeleteImageMethod = ImagesGrpc.getDeleteImageMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getDeleteImageMethod = ImagesGrpc.getDeleteImageMethod) == null) {
          ImagesGrpc.getDeleteImageMethod = getDeleteImageMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.DeleteImageRequest, com.instagram_clone.image_service.DeleteImageResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "DeleteImage"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.DeleteImageRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.DeleteImageResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("DeleteImage"))
                  .build();
          }
        }
     }
     return getDeleteImageMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageRequest,
      com.instagram_clone.image_service.GetImageResponse> getGetImageMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageRequest,
      com.instagram_clone.image_service.GetImageResponse> getGetImageMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageRequest, com.instagram_clone.image_service.GetImageResponse> getGetImageMethod;
    if ((getGetImageMethod = ImagesGrpc.getGetImageMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getGetImageMethod = ImagesGrpc.getGetImageMethod) == null) {
          ImagesGrpc.getGetImageMethod = getGetImageMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.GetImageRequest, com.instagram_clone.image_service.GetImageResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "GetImage"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetImageRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetImageResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("GetImage"))
                  .build();
          }
        }
     }
     return getGetImageMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageDataRequest,
      com.instagram_clone.image_service.GetImageDataResponse> getGetImageDataMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageDataRequest,
      com.instagram_clone.image_service.GetImageDataResponse> getGetImageDataMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetImageDataRequest, com.instagram_clone.image_service.GetImageDataResponse> getGetImageDataMethod;
    if ((getGetImageDataMethod = ImagesGrpc.getGetImageDataMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getGetImageDataMethod = ImagesGrpc.getGetImageDataMethod) == null) {
          ImagesGrpc.getGetImageDataMethod = getGetImageDataMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.GetImageDataRequest, com.instagram_clone.image_service.GetImageDataResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "GetImageData"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetImageDataRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetImageDataResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("GetImageData"))
                  .build();
          }
        }
     }
     return getGetImageDataMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetUserImagesRequest,
      com.instagram_clone.image_service.GetUserImagesResponse> getGetUserImagesMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetUserImagesRequest,
      com.instagram_clone.image_service.GetUserImagesResponse> getGetUserImagesMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.GetUserImagesRequest, com.instagram_clone.image_service.GetUserImagesResponse> getGetUserImagesMethod;
    if ((getGetUserImagesMethod = ImagesGrpc.getGetUserImagesMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getGetUserImagesMethod = ImagesGrpc.getGetUserImagesMethod) == null) {
          ImagesGrpc.getGetUserImagesMethod = getGetUserImagesMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.GetUserImagesRequest, com.instagram_clone.image_service.GetUserImagesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "GetUserImages"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetUserImagesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.GetUserImagesResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("GetUserImages"))
                  .build();
          }
        }
     }
     return getGetUserImagesMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.instagram_clone.image_service.SearchImagesRequest,
      com.instagram_clone.image_service.SearchImagesResponse> getSearchImagesMethod;

  public static io.grpc.MethodDescriptor<com.instagram_clone.image_service.SearchImagesRequest,
      com.instagram_clone.image_service.SearchImagesResponse> getSearchImagesMethod() {
    io.grpc.MethodDescriptor<com.instagram_clone.image_service.SearchImagesRequest, com.instagram_clone.image_service.SearchImagesResponse> getSearchImagesMethod;
    if ((getSearchImagesMethod = ImagesGrpc.getSearchImagesMethod) == null) {
      synchronized (ImagesGrpc.class) {
        if ((getSearchImagesMethod = ImagesGrpc.getSearchImagesMethod) == null) {
          ImagesGrpc.getSearchImagesMethod = getSearchImagesMethod = 
              io.grpc.MethodDescriptor.<com.instagram_clone.image_service.SearchImagesRequest, com.instagram_clone.image_service.SearchImagesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(
                  "Image.Images", "SearchImages"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.SearchImagesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.instagram_clone.image_service.SearchImagesResponse.getDefaultInstance()))
                  .setSchemaDescriptor(new ImagesMethodDescriptorSupplier("SearchImages"))
                  .build();
          }
        }
     }
     return getSearchImagesMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static ImagesStub newStub(io.grpc.Channel channel) {
    return new ImagesStub(channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static ImagesBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    return new ImagesBlockingStub(channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static ImagesFutureStub newFutureStub(
      io.grpc.Channel channel) {
    return new ImagesFutureStub(channel);
  }

  /**
   * Creates a new vertx stub that supports all call types for the service
   */
  public static ImagesVertxStub newVertxStub(io.grpc.Channel channel) {
    return new ImagesVertxStub(channel);
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static abstract class ImagesImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Create a new image
     * </pre>
     */
    public io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageRequest> createImage(
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageResponse> responseObserver) {
      return asyncUnimplementedStreamingCall(getCreateImageMethod(), responseObserver);
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public void deleteImage(com.instagram_clone.image_service.DeleteImageRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.DeleteImageResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getDeleteImageMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public void getImage(com.instagram_clone.image_service.GetImageRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getGetImageMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get image data
     * </pre>
     */
    public void getImageData(com.instagram_clone.image_service.GetImageDataRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageDataResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getGetImageDataMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public void getUserImages(com.instagram_clone.image_service.GetUserImagesRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetUserImagesResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getGetUserImagesMethod(), responseObserver);
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public void searchImages(com.instagram_clone.image_service.SearchImagesRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.SearchImagesResponse> responseObserver) {
      asyncUnimplementedUnaryCall(getSearchImagesMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getCreateImageMethod(),
            asyncClientStreamingCall(
              new MethodHandlers<
                com.instagram_clone.image_service.CreateImageRequest,
                com.instagram_clone.image_service.CreateImageResponse>(
                  this, METHODID_CREATE_IMAGE)))
          .addMethod(
            getDeleteImageMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.image_service.DeleteImageRequest,
                com.instagram_clone.image_service.DeleteImageResponse>(
                  this, METHODID_DELETE_IMAGE)))
          .addMethod(
            getGetImageMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.image_service.GetImageRequest,
                com.instagram_clone.image_service.GetImageResponse>(
                  this, METHODID_GET_IMAGE)))
          .addMethod(
            getGetImageDataMethod(),
            asyncServerStreamingCall(
              new MethodHandlers<
                com.instagram_clone.image_service.GetImageDataRequest,
                com.instagram_clone.image_service.GetImageDataResponse>(
                  this, METHODID_GET_IMAGE_DATA)))
          .addMethod(
            getGetUserImagesMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.image_service.GetUserImagesRequest,
                com.instagram_clone.image_service.GetUserImagesResponse>(
                  this, METHODID_GET_USER_IMAGES)))
          .addMethod(
            getSearchImagesMethod(),
            asyncUnaryCall(
              new MethodHandlers<
                com.instagram_clone.image_service.SearchImagesRequest,
                com.instagram_clone.image_service.SearchImagesResponse>(
                  this, METHODID_SEARCH_IMAGES)))
          .build();
    }
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static final class ImagesStub extends io.grpc.stub.AbstractStub<ImagesStub> {
    public ImagesStub(io.grpc.Channel channel) {
      super(channel);
    }

    public ImagesStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ImagesStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ImagesStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create a new image
     * </pre>
     */
    public io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageRequest> createImage(
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageResponse> responseObserver) {
      return asyncClientStreamingCall(
          getChannel().newCall(getCreateImageMethod(), getCallOptions()), responseObserver);
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public void deleteImage(com.instagram_clone.image_service.DeleteImageRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.DeleteImageResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getDeleteImageMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public void getImage(com.instagram_clone.image_service.GetImageRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetImageMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get image data
     * </pre>
     */
    public void getImageData(com.instagram_clone.image_service.GetImageDataRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageDataResponse> responseObserver) {
      asyncServerStreamingCall(
          getChannel().newCall(getGetImageDataMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public void getUserImages(com.instagram_clone.image_service.GetUserImagesRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetUserImagesResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getGetUserImagesMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public void searchImages(com.instagram_clone.image_service.SearchImagesRequest request,
        io.grpc.stub.StreamObserver<com.instagram_clone.image_service.SearchImagesResponse> responseObserver) {
      asyncUnaryCall(
          getChannel().newCall(getSearchImagesMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static final class ImagesBlockingStub extends io.grpc.stub.AbstractStub<ImagesBlockingStub> {
    public ImagesBlockingStub(io.grpc.Channel channel) {
      super(channel);
    }

    public ImagesBlockingStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ImagesBlockingStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ImagesBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public com.instagram_clone.image_service.DeleteImageResponse deleteImage(com.instagram_clone.image_service.DeleteImageRequest request) {
      return blockingUnaryCall(
          getChannel(), getDeleteImageMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public com.instagram_clone.image_service.GetImageResponse getImage(com.instagram_clone.image_service.GetImageRequest request) {
      return blockingUnaryCall(
          getChannel(), getGetImageMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get image data
     * </pre>
     */
    public java.util.Iterator<com.instagram_clone.image_service.GetImageDataResponse> getImageData(
        com.instagram_clone.image_service.GetImageDataRequest request) {
      return blockingServerStreamingCall(
          getChannel(), getGetImageDataMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public com.instagram_clone.image_service.GetUserImagesResponse getUserImages(com.instagram_clone.image_service.GetUserImagesRequest request) {
      return blockingUnaryCall(
          getChannel(), getGetUserImagesMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public com.instagram_clone.image_service.SearchImagesResponse searchImages(com.instagram_clone.image_service.SearchImagesRequest request) {
      return blockingUnaryCall(
          getChannel(), getSearchImagesMethod(), getCallOptions(), request);
    }
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static final class ImagesFutureStub extends io.grpc.stub.AbstractStub<ImagesFutureStub> {
    public ImagesFutureStub(io.grpc.Channel channel) {
      super(channel);
    }

    public ImagesFutureStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ImagesFutureStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ImagesFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.image_service.DeleteImageResponse> deleteImage(
        com.instagram_clone.image_service.DeleteImageRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getDeleteImageMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.image_service.GetImageResponse> getImage(
        com.instagram_clone.image_service.GetImageRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getGetImageMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.image_service.GetUserImagesResponse> getUserImages(
        com.instagram_clone.image_service.GetUserImagesRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getGetUserImagesMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.instagram_clone.image_service.SearchImagesResponse> searchImages(
        com.instagram_clone.image_service.SearchImagesRequest request) {
      return futureUnaryCall(
          getChannel().newCall(getSearchImagesMethod(), getCallOptions()), request);
    }
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static abstract class ImagesVertxImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Create a new image
     * </pre>
     */
    public void createImage(io.vertx.grpc.GrpcReadStream<com.instagram_clone.image_service.CreateImageRequest> request,
        io.vertx.core.Future<com.instagram_clone.image_service.CreateImageResponse> response) {
      request.setReadObserver(asyncUnimplementedStreamingCall(getCreateImageMethod(), ImagesGrpc.toObserver(response.completer())));
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public void deleteImage(com.instagram_clone.image_service.DeleteImageRequest request,
        io.vertx.core.Future<com.instagram_clone.image_service.DeleteImageResponse> response) {
      asyncUnimplementedUnaryCall(getDeleteImageMethod(), ImagesGrpc.toObserver(response.completer()));
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public void getImage(com.instagram_clone.image_service.GetImageRequest request,
        io.vertx.core.Future<com.instagram_clone.image_service.GetImageResponse> response) {
      asyncUnimplementedUnaryCall(getGetImageMethod(), ImagesGrpc.toObserver(response.completer()));
    }

    /**
     * <pre>
     * Get image data
     * </pre>
     */
    public void getImageData(com.instagram_clone.image_service.GetImageDataRequest request,
        io.vertx.grpc.GrpcWriteStream<com.instagram_clone.image_service.GetImageDataResponse> response) {
      asyncUnimplementedUnaryCall(getGetImageDataMethod(), response.writeObserver());
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public void getUserImages(com.instagram_clone.image_service.GetUserImagesRequest request,
        io.vertx.core.Future<com.instagram_clone.image_service.GetUserImagesResponse> response) {
      asyncUnimplementedUnaryCall(getGetUserImagesMethod(), ImagesGrpc.toObserver(response.completer()));
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public void searchImages(com.instagram_clone.image_service.SearchImagesRequest request,
        io.vertx.core.Future<com.instagram_clone.image_service.SearchImagesResponse> response) {
      asyncUnimplementedUnaryCall(getSearchImagesMethod(), ImagesGrpc.toObserver(response.completer()));
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getCreateImageMethod(),
            asyncClientStreamingCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.CreateImageRequest,
                com.instagram_clone.image_service.CreateImageResponse>(
                  this, METHODID_CREATE_IMAGE)))
          .addMethod(
            getDeleteImageMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.DeleteImageRequest,
                com.instagram_clone.image_service.DeleteImageResponse>(
                  this, METHODID_DELETE_IMAGE)))
          .addMethod(
            getGetImageMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.GetImageRequest,
                com.instagram_clone.image_service.GetImageResponse>(
                  this, METHODID_GET_IMAGE)))
          .addMethod(
            getGetImageDataMethod(),
            asyncServerStreamingCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.GetImageDataRequest,
                com.instagram_clone.image_service.GetImageDataResponse>(
                  this, METHODID_GET_IMAGE_DATA)))
          .addMethod(
            getGetUserImagesMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.GetUserImagesRequest,
                com.instagram_clone.image_service.GetUserImagesResponse>(
                  this, METHODID_GET_USER_IMAGES)))
          .addMethod(
            getSearchImagesMethod(),
            asyncUnaryCall(
              new VertxMethodHandlers<
                com.instagram_clone.image_service.SearchImagesRequest,
                com.instagram_clone.image_service.SearchImagesResponse>(
                  this, METHODID_SEARCH_IMAGES)))
          .build();
    }
  }

  /**
   * <pre>
   * Service that is exposed via gRPC
   * </pre>
   */
  public static final class ImagesVertxStub extends io.grpc.stub.AbstractStub<ImagesVertxStub> {
    public ImagesVertxStub(io.grpc.Channel channel) {
      super(channel);
    }

    public ImagesVertxStub(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected ImagesVertxStub build(io.grpc.Channel channel,
        io.grpc.CallOptions callOptions) {
      return new ImagesVertxStub(channel, callOptions);
    }

    /**
     * <pre>
     * Create a new image
     * </pre>
     */
    public void createImage(io.vertx.core.Handler<
        io.vertx.grpc.GrpcUniExchange<com.instagram_clone.image_service.CreateImageRequest, com.instagram_clone.image_service.CreateImageResponse>> handler) {
      final io.vertx.grpc.GrpcReadStream<com.instagram_clone.image_service.CreateImageResponse> readStream =
          io.vertx.grpc.GrpcReadStream.<com.instagram_clone.image_service.CreateImageResponse>create();

      handler.handle(io.vertx.grpc.GrpcUniExchange.create(readStream, asyncClientStreamingCall(
          getChannel().newCall(getCreateImageMethod(), getCallOptions()), readStream.readObserver())));
    }

    /**
     * <pre>
     * Delete an image
     * </pre>
     */
    public void deleteImage(com.instagram_clone.image_service.DeleteImageRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.image_service.DeleteImageResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getDeleteImageMethod(), getCallOptions()), request, ImagesGrpc.toObserver(response));
    }

    /**
     * <pre>
     * Get a single image (metadata)
     * </pre>
     */
    public void getImage(com.instagram_clone.image_service.GetImageRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.image_service.GetImageResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getGetImageMethod(), getCallOptions()), request, ImagesGrpc.toObserver(response));
    }

    /**
     * <pre>
     * Get image data
     * </pre>
     */
    public void getImageData(com.instagram_clone.image_service.GetImageDataRequest request,
        io.vertx.core.Handler<io.vertx.grpc.GrpcReadStream<com.instagram_clone.image_service.GetImageDataResponse>> handler) {
      final io.vertx.grpc.GrpcReadStream<com.instagram_clone.image_service.GetImageDataResponse> readStream =
          io.vertx.grpc.GrpcReadStream.<com.instagram_clone.image_service.GetImageDataResponse>create();

      handler.handle(readStream);
      asyncServerStreamingCall(
          getChannel().newCall(getGetImageDataMethod(), getCallOptions()), request, readStream.readObserver());
    }

    /**
     * <pre>
     * Get user's images
     * </pre>
     */
    public void getUserImages(com.instagram_clone.image_service.GetUserImagesRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.image_service.GetUserImagesResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getGetUserImagesMethod(), getCallOptions()), request, ImagesGrpc.toObserver(response));
    }

    /**
     * <pre>
     * Search for images based on hash tags or user tags
     * </pre>
     */
    public void searchImages(com.instagram_clone.image_service.SearchImagesRequest request,
        io.vertx.core.Handler<io.vertx.core.AsyncResult<com.instagram_clone.image_service.SearchImagesResponse>> response) {
      asyncUnaryCall(
          getChannel().newCall(getSearchImagesMethod(), getCallOptions()), request, ImagesGrpc.toObserver(response));
    }
  }

  private static final int METHODID_DELETE_IMAGE = 0;
  private static final int METHODID_GET_IMAGE = 1;
  private static final int METHODID_GET_IMAGE_DATA = 2;
  private static final int METHODID_GET_USER_IMAGES = 3;
  private static final int METHODID_SEARCH_IMAGES = 4;
  private static final int METHODID_CREATE_IMAGE = 5;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final ImagesImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(ImagesImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_DELETE_IMAGE:
          serviceImpl.deleteImage((com.instagram_clone.image_service.DeleteImageRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.DeleteImageResponse>) responseObserver);
          break;
        case METHODID_GET_IMAGE:
          serviceImpl.getImage((com.instagram_clone.image_service.GetImageRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageResponse>) responseObserver);
          break;
        case METHODID_GET_IMAGE_DATA:
          serviceImpl.getImageData((com.instagram_clone.image_service.GetImageDataRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageDataResponse>) responseObserver);
          break;
        case METHODID_GET_USER_IMAGES:
          serviceImpl.getUserImages((com.instagram_clone.image_service.GetUserImagesRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetUserImagesResponse>) responseObserver);
          break;
        case METHODID_SEARCH_IMAGES:
          serviceImpl.searchImages((com.instagram_clone.image_service.SearchImagesRequest) request,
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.SearchImagesResponse>) responseObserver);
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
        case METHODID_CREATE_IMAGE:
          return (io.grpc.stub.StreamObserver<Req>) serviceImpl.createImage(
              (io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageResponse>) responseObserver);
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
    private final ImagesVertxImplBase serviceImpl;
    private final int methodId;

    VertxMethodHandlers(ImagesVertxImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_DELETE_IMAGE:
          serviceImpl.deleteImage((com.instagram_clone.image_service.DeleteImageRequest) request,
              (io.vertx.core.Future<com.instagram_clone.image_service.DeleteImageResponse>) io.vertx.core.Future.<com.instagram_clone.image_service.DeleteImageResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.image_service.DeleteImageResponse>) responseObserver).onNext(ar.result());
                  responseObserver.onCompleted();
                } else {
                  responseObserver.onError(ar.cause());
                }
              }));
          break;
        case METHODID_GET_IMAGE:
          serviceImpl.getImage((com.instagram_clone.image_service.GetImageRequest) request,
              (io.vertx.core.Future<com.instagram_clone.image_service.GetImageResponse>) io.vertx.core.Future.<com.instagram_clone.image_service.GetImageResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetImageResponse>) responseObserver).onNext(ar.result());
                  responseObserver.onCompleted();
                } else {
                  responseObserver.onError(ar.cause());
                }
              }));
          break;
        case METHODID_GET_IMAGE_DATA:
          serviceImpl.getImageData((com.instagram_clone.image_service.GetImageDataRequest) request,
              (io.vertx.grpc.GrpcWriteStream<com.instagram_clone.image_service.GetImageDataResponse>) io.vertx.grpc.GrpcWriteStream.create(responseObserver));
          break;
        case METHODID_GET_USER_IMAGES:
          serviceImpl.getUserImages((com.instagram_clone.image_service.GetUserImagesRequest) request,
              (io.vertx.core.Future<com.instagram_clone.image_service.GetUserImagesResponse>) io.vertx.core.Future.<com.instagram_clone.image_service.GetUserImagesResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.image_service.GetUserImagesResponse>) responseObserver).onNext(ar.result());
                  responseObserver.onCompleted();
                } else {
                  responseObserver.onError(ar.cause());
                }
              }));
          break;
        case METHODID_SEARCH_IMAGES:
          serviceImpl.searchImages((com.instagram_clone.image_service.SearchImagesRequest) request,
              (io.vertx.core.Future<com.instagram_clone.image_service.SearchImagesResponse>) io.vertx.core.Future.<com.instagram_clone.image_service.SearchImagesResponse>future().setHandler(ar -> {
                if (ar.succeeded()) {
                  ((io.grpc.stub.StreamObserver<com.instagram_clone.image_service.SearchImagesResponse>) responseObserver).onNext(ar.result());
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
        case METHODID_CREATE_IMAGE:
          io.vertx.grpc.GrpcReadStream<com.instagram_clone.image_service.CreateImageRequest> request0 = io.vertx.grpc.GrpcReadStream.<com.instagram_clone.image_service.CreateImageRequest>create();
          serviceImpl.createImage(request0, (io.vertx.core.Future<com.instagram_clone.image_service.CreateImageResponse>) io.vertx.core.Future.<com.instagram_clone.image_service.CreateImageResponse>future().setHandler(ar -> {
            if (ar.succeeded()) {
              ((io.grpc.stub.StreamObserver<com.instagram_clone.image_service.CreateImageResponse>) responseObserver).onNext(ar.result());
              responseObserver.onCompleted();
            } else {
              responseObserver.onError(ar.cause());
            }
          }));
          return (io.grpc.stub.StreamObserver<Req>) request0.readObserver();
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class ImagesBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    ImagesBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.instagram_clone.image_service.ImageService.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Images");
    }
  }

  private static final class ImagesFileDescriptorSupplier
      extends ImagesBaseDescriptorSupplier {
    ImagesFileDescriptorSupplier() {}
  }

  private static final class ImagesMethodDescriptorSupplier
      extends ImagesBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    ImagesMethodDescriptorSupplier(String methodName) {
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
      synchronized (ImagesGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new ImagesFileDescriptorSupplier())
              .addMethod(getCreateImageMethod())
              .addMethod(getDeleteImageMethod())
              .addMethod(getGetImageMethod())
              .addMethod(getGetImageDataMethod())
              .addMethod(getGetUserImagesMethod())
              .addMethod(getSearchImagesMethod())
              .build();
        }
      }
    }
    return result;
  }
}
