package com.instagram_clone.image_service.data

import com.instagram_clone.image_service.Image
import com.instagram_clone.image_service.exception.CaptionTooLongException
import com.instagram_clone.image_service.exception.InvalidDataException
import com.instagram_clone.image_service.util.DocumentParser
import com.instagram_clone.image_service.util.TagParser
import org.apache.tika.metadata.Metadata
import org.apache.tika.parser.AutoDetectParser
import org.apache.tika.sax.BodyContentHandler
import java.awt.image.BufferedImage
import java.io.BufferedInputStream
import java.io.ByteArrayInputStream
import java.io.InputStream
import java.net.URLConnection
import java.util.*
import javax.imageio.ImageIO

const val MAX_CAPTION_LENGTH = 500

/**
 * Map given image properties into an instance of [ImageMeta]
 */
@Throws(InvalidDataException::class, CaptionTooLongException::class)
fun mapImageMeta(caption: String, userId: String, mimeType: String, stream: InputStream): ImageMeta {
  if (caption.length > MAX_CAPTION_LENGTH) {
    throw CaptionTooLongException(
      "Caption cannot be longer than $MAX_CAPTION_LENGTH but received ${caption.length}"
    )
  }
  val buf = ImageIO.read(stream) ?: throw InvalidDataException(
    "Unable to read the given data into BufferedImage"
  )

  val width = buf.width
  val height = buf.height

  return mapImageMeta(
    caption,
    userId,
    width,
    height,
    mimeType
  )
}

/**
 * Map given image properties into an instance of [ImageMeta]
 */
fun mapImageMeta(
  caption: String,
  userId: String,
  width: Int,
  height: Int,
  type: String
): ImageMeta = ImageMeta(
  UUID.randomUUID().toString(),
  type,
  width,
  height,
  userId,
  caption,
  hashTags = TagParser.parseHashTags(caption),
  userTags = TagParser.parseUserTags(caption)
)

/**
 * Build a gRPC [Image] message from [ImageMeta]
 */
fun fromImageMeta(meta: ImageMeta): Image = Image.newBuilder()
  .setId(meta.id)
  .setMimeType(meta.mimeType)
  .setWidth(meta.width)
  .setHeight(meta.height)
  .setUserId(meta.userId)
  .setCaption(meta.caption)
  .setCreatedAt(meta.createdAt)
  .addAllUserTags(meta.userTags)
  .addAllHashTags(meta.hashTags)
  .build()

