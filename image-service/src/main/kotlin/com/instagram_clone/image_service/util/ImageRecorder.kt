package com.instagram_clone.image_service.util

import com.google.protobuf.ByteString
import com.instagram_clone.image_service.CreateImageRequest
import com.instagram_clone.image_service.ImageType
import com.instagram_clone.image_service.Metadata
import com.instagram_clone.image_service.data.ImageMeta
import com.instagram_clone.image_service.data.mapImageMeta
import com.instagram_clone.image_service.exception.InvalidDataException
import java.io.InputStream

class ImageRecorder {

  var metadata: Metadata? = null
    private set

  var chunks: ByteString? = null
    private set

  var chunkCount: Int = 0
    private set

  fun takeChunk(req: CreateImageRequest) {
    val meta = req.metaData
    val data = req.data
    if (metadata == null) {
      if (meta == null) {
        throw InvalidDataException(
          "The first chunk should contain the metadata but received null"
        )
      }
      metadata = meta
    } else if (data == null) {
      throw InvalidDataException(
        "Expected to receive data but received null"
      )
    } else {
      chunks = chunks?.concat(data) ?: data
    }
  }

  fun toImageMeta(): ImageMeta {
    val meta = metadata ?: throw InvalidDataException(
      "Metadata is missing"
    )
    val stream = chunks?.newInput() ?: throw InvalidDataException("Image data is missing")
    val mimeType = when (meta.imageType) {
      ImageType.JPG -> "image/jpeg"
      ImageType.PNG -> "image/png"
      else -> throw InvalidDataException("Invalid image type: ${meta.imageType}")
    }
    return mapImageMeta(meta.caption, meta.creatorId, mimeType, stream)
  }
}
