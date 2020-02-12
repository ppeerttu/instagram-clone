package com.instagram_clone.image_service.data

import com.instagram_clone.image_service.ImageLikesPage

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
