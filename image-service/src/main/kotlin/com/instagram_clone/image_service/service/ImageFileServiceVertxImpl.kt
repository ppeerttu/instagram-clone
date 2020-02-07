package com.instagram_clone.image_service.service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.exception.NotFoundException
import io.vertx.core.Future
import io.vertx.core.Promise
import io.vertx.core.Vertx
import io.vertx.core.buffer.Buffer
import io.vertx.core.file.FileSystemException
import java.nio.file.NoSuchFileException

class ImageFileServiceVertxImpl(
  private val vertx: Vertx
) : ImageFileService {

  private val config = AppConfig.getInstance()

  override fun saveImageFile(id: String, data: ByteArray): Future<Nothing> {
    val promise = Promise.promise<Nothing>()

    vertx.fileSystem()
      .writeFile(getImagePath(id), Buffer.buffer(data)) {
        if (it.succeeded()) {
          promise.complete()
        } else {
          promise.fail(it.cause())
        }
      }
    return promise.future()
  }

  override fun deleteImageFile(id: String): Future<Nothing> {
    val promise = Promise.promise<Nothing>()

    vertx.fileSystem()
      .delete(getImagePath(id)) {
        if (it.succeeded()) {
          promise.complete()
        } else {
          promise.fail(
            when (it.cause()) {
              is FileSystemException -> NotFoundException("No image file found with id $id")
              else -> it.cause()
            }
          )
        }
      }
    return promise.future()
  }

  override fun getImageFile(id: String): Future<ByteArray> {
    val promise = Promise.promise<ByteArray>()

    vertx.fileSystem()
      .readFile(getImagePath(id)) {
        if (it.succeeded()) {
          promise.complete(it.result().bytes)
        } else {
          promise.fail(it.cause())
        }
      }
    return promise.future()
  }

  /**
   * Get file path to given image based on it's [id].
   */
  private fun getImagePath(id: String): String = "${config.imageDataDir}/$id"
}
