package com.instagram_clone.image_service.service

import com.google.protobuf.ByteString
import com.instagram_clone.image_service.*
import com.instagram_clone.image_service.ImagesGrpc.ImagesImplBase
import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.data.fromImageMeta
import com.instagram_clone.image_service.data.mapImageMeta
import com.instagram_clone.image_service.exception.CaptionTooLongException
import com.instagram_clone.image_service.exception.InvalidDataException
import io.grpc.stub.StreamObserver
import io.vertx.core.buffer.Buffer
import io.vertx.core.file.AsyncFile
import io.vertx.core.file.FileSystem
import io.vertx.core.file.impl.AsyncFileImpl
import io.vertx.core.file.impl.FileSystemImpl
import io.vertx.core.logging.LoggerFactory
import io.vertx.kotlin.core.Vertx
import java.awt.image.BufferedImage
import java.awt.image.DataBufferByte
import java.io.ByteArrayInputStream
import java.net.URLConnection
import java.nio.ByteBuffer
import javax.imageio.ImageIO

fun ByteArray.toHexString() = joinToString { "%02x".format(it) }
fun ByteString.toHexString() = joinToString { "%02x".format(it) }

/**
 * Class implementing the image_service.proto Image service interface.
 */
class ImageServiceGrpcImpl(
  private val service: ImageMetaService,
  private val vertx: io.vertx.core.Vertx
) : ImagesImplBase() {

  /**
   * Application configuration values
   */
  private val appConfig = AppConfig.getInstance()

  private val logger = LoggerFactory.getLogger("ImageServiceGrpcImpl")

  /**
   * Create a new image based on given meta-data and image byte data.
   */
  override fun createImage(request: CreateImageRequest, responseObserver: StreamObserver<CreateImageResponse>) {
    val caption = request.caption
    val creatorId = request.creatorId
    val stream = request.data.newInput()
    val bytes = request.data.toByteArray()
    val builder = CreateImageResponse.newBuilder()

    val meta: ImageMeta = try {
      mapImageMeta(caption, creatorId, stream)
    } catch (e: Exception) {
      logger.warn(e.message)
      logger.info("First 10 bytes of ByteArray as hex: ${bytes.sliceArray(IntRange(0, 9)).toHexString()}")
      logger.info("First 10 bytes of ByteString as hex: ${request.data.substring(0, 10).toHexString()}")
      responseObserver.onNext(
        builder
          .setError(
            when (e) {
              is InvalidDataException -> CreateImageErrorStatus.INVALID_DATA
              is CaptionTooLongException -> CreateImageErrorStatus.CAPTION_TOO_LONG
              else -> CreateImageErrorStatus.CREATE_IMAGE_SERVER_ERROR
            }
          )
          .build()
      )
      responseObserver.onCompleted()
      return
    }
    service.saveImageMeta(meta)
      .onSuccess { meta ->
        vertx
          .fileSystem()
          .writeFile("${appConfig.imageDataDir}/${meta.id}", Buffer.buffer(bytes)) {
            if (it.succeeded()) {
              builder.image = fromImageMeta(meta)
            } else {
              logger.error("Failed to persist the image on disk:", it.cause())
              builder.error = CreateImageErrorStatus.CREATE_IMAGE_SERVER_ERROR
              // We don't have to wait for this before returning response
              service.deleteImage(meta.id)
                .onSuccess {
                  logger.info("Removed metadata of image ${meta.id} as a result of failed file disk save")
                }
                .onFailure {  e ->
                  logger.error("Failed to remove metadata of image ${meta.id}:", e)
                }
            }
            responseObserver.onNext(
              builder.build()
            )
            responseObserver.onCompleted()
          }
      }
      .onFailure { e ->
        val error = when (e) {
          is CaptionTooLongException -> CreateImageErrorStatus.CAPTION_TOO_LONG
          else -> {
            logger.error("Failed persist image meta data into database:", e)
            CreateImageErrorStatus.CREATE_IMAGE_SERVER_ERROR
          }
        }
        responseObserver.onNext(
          builder
            .setError(error)
            .build()
        )
          responseObserver.onCompleted()
      }
  }

  /**
   * Get image metadata based on image ID.
   */
  override fun getImage(request: GetImageRequest, responseObserver: StreamObserver<GetImageResponse>) {
    val imageId = request.imageId
    val builder = GetImageResponse.newBuilder()
    service.getImageMeta(imageId)
      .onSuccess { meta ->
        if (meta != null) {
          builder.image  = fromImageMeta(meta)
        } else {
          builder.error = GetImageErrorStatus.IMAGE_NOT_FOUND
        }
        responseObserver.onNext(builder.build())
        responseObserver.onCompleted()
      }
      .onFailure { e ->
        logger.error("Failure on fetch image meta for id $imageId:", e)
        builder.error = GetImageErrorStatus.GET_IMAGE_SERVER_ERROR
        responseObserver.onNext(builder.build())
        responseObserver.onCompleted()
      }
  }

  override fun deleteImage(request: DeleteImageRequest, responseObserver: StreamObserver<DeleteImageResponse>) {
    val imageId = request.id
    val builder = DeleteImageResponse.newBuilder()
    service.deleteImage(imageId)
      .onSuccess { _ ->
        vertx.fileSystem()
          .delete("${appConfig.imageDataDir}/${imageId}") {
            if (it.succeeded()) {
              builder.status = DeleteImageStatus.OK
            } else {
              logger.error("Failed to delete image $imageId data on disk:", it.cause())
              builder.status = DeleteImageStatus.DELETE_IMAGE_SERVER_ERROR
            }
            responseObserver.onNext(builder.build())
            responseObserver.onCompleted()
          }
      }
      .onFailure {
        logger.error("Failed to delete image $imageId:", it)
        builder.status = DeleteImageStatus.DELETE_IMAGE_SERVER_ERROR
        responseObserver.onNext(builder.build())
        responseObserver.onCompleted()
      }
  }

  override fun getImageData(request: GetImageDataRequest, responseObserver: StreamObserver<GetImageDataResponse>) {
    val imageId = request.imageId
    val builder = GetImageDataResponse.newBuilder()
    vertx.fileSystem()
      .readFile("${appConfig.imageDataDir}/${imageId}") { res ->
        if (res.succeeded()) {
          builder.data = ByteString.copyFrom(res.result().bytes)
        } else {
          logger.warn("Failed to fetch image data for image $imageId: " + res.cause().message)
          builder.error = GetImageErrorStatus.IMAGE_NOT_FOUND
        }
        responseObserver.onNext(builder.build())
        responseObserver.onCompleted()
      }
  }
}
