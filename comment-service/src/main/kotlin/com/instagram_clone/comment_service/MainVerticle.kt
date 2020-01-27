package com.instagram_clone.comment_service

import com.instagram_clone.comment_service.service.CommentServiceGrpcImpl
import com.instagram_clone.comment_service.service.CommentServiceMockImpl
import io.vertx.config.ConfigRetriever
import io.vertx.core.AbstractVerticle
import io.vertx.core.Context
import io.vertx.core.Promise
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.mongo.MongoClient
import io.vertx.grpc.VertxServerBuilder

class MainVerticle : AbstractVerticle() {

  private lateinit var logger: Logger

  override fun init(vertx: Vertx, context: Context) {
    super.init(vertx, context)
    logger = LoggerFactory.getLogger("MainVerticle")
  }

  override fun start(startPromise: Promise<Void>) {
    val commentService = CommentServiceMockImpl()
    val service: CommentsGrpc.CommentsImplBase = CommentServiceGrpcImpl(commentService)

    val rpcServer = VertxServerBuilder
      .forAddress(vertx, "0.0.0.0", 3001)
      .addService(service)
      .build()

    // Start is asynchronous
    rpcServer.start()
    logger.info("Grpc server started")
    startPromise.complete()
  }
}
