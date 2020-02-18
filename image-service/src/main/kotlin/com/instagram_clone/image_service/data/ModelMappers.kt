package com.instagram_clone.image_service.data

import com.instagram_clone.image_service.Image
import com.instagram_clone.image_service.ImageLikesPage
import com.instagram_clone.image_service.ImageSearchPage
import com.instagram_clone.image_service.UserImagePage
import com.instagram_clone.image_service.exception.CaptionTooLongException
import com.instagram_clone.image_service.exception.InvalidDataException
import com.instagram_clone.image_service.util.TagParser
import java.io.InputStream
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
  .setLikes(meta.likes)
  .build()



/**
 * Create a [UserImagePage] instance from given [page].
 */
fun fromUserImagesPage(page: UserImagesPageWrapper): UserImagePage = UserImagePage
  .newBuilder()
  .setUserId(page.userId)
  .setSize(page.size)
  .setPage(page.page)
  .setCount(page.count)
  .setTotalCount(page.totalCount)
  .addAllImages(page.images.map { fromImageMeta(it) })
  .build()

/**
 * Create an instance of [ImageLikesPage] from [page].
 */
fun fromImageLikePage(page: ImageLikePageWrapper): ImageLikesPage = ImageLikesPage
  .newBuilder()
  .setImageId(page.imageId)
  .setPage(page.page)
  .setSize(page.size)
  .setUsersCount4(page.usersCount)
  .setTotalUsersCount(page.totalUsersCount)
  .addAllUsers6(page.users)
  .build()

/**
 * Create an instance of [ImageSearchPage] from [page].
 */
fun fromImageSearchPage(page: ImageSearchPageWrapper): ImageSearchPage = ImageSearchPage
  .newBuilder()
  .setPage(page.page)
  .setSize(page.size)
  .setCount(page.count)
  .setTotalCount(page.totalCount)
  .addAllImages(page.images.map { fromImageMeta(it) })
  .also {
    if (page.searchType == ImageSearchType.UserTag) {
      it.userTag = page.search
    } else {
      it.hashTag = page.search
    }
  }
  .build()
