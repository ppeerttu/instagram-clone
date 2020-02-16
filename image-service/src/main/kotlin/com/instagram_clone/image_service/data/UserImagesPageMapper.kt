package com.instagram_clone.image_service.data

import com.instagram_clone.image_service.UserImagePage

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
