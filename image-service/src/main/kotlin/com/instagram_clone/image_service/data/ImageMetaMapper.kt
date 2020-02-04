package com.instagram_clone.image_service.data

import com.instagram_clone.image_service.Image
import com.instagram_clone.image_service.exception.InvalidDataException
import java.awt.image.BufferedImage
import java.util.*

/**
 * Map given image properties into an instance of [ImageMeta]
 */
@Throws(InvalidDataException::class)
fun mapImageMeta(caption: String, userId: String, buf: BufferedImage): ImageMeta {
  val width = buf.width
  val height = buf.height

  val type = when (buf.type) {
    BufferedImage.TYPE_INT_RGB -> "img/jpg"
    BufferedImage.TYPE_INT_ARGB -> "img/png"
    BufferedImage.TYPE_4BYTE_ABGR -> "img/png"
    else -> throw InvalidDataException("Given image type ${buf.type} is not supported")
  }
  return mapImageMeta(
    caption,
    userId,
    width,
    height,
    type
  )
}

/**
 * Map given image properties into an instance of [ImageMeta]
 */
fun mapImageMeta(caption: String, userId: String, width: Int, height: Int, type: String): ImageMeta = ImageMeta(
  UUID.randomUUID().toString(),
  type,
  width,
  height,
  userId,
  caption,
  Date()
)

/**
 * Build a gRPC [Image] message from [ImageMeta]
 */
fun fromImageMeta(meta: ImageMeta): Image = Image.newBuilder()
  .setId(meta.id)
  .setType(meta.type)
  .setWidth(meta.width)
  .setHeight(meta.height)
  .setUserId(meta.userId)
  .setCaption(meta.caption)
  .setCreatedAt(meta.createdAt.toString())
  .build()
