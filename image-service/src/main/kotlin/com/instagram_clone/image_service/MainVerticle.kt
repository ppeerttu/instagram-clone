package com.instagram_clone.image_service

import io.vertx.core.AbstractVerticle
import io.vertx.core.Context
import io.vertx.core.Promise
import io.vertx.core.Vertx
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.grpc.VertxServerBuilder

const val PORT = 3000

class MainVerticle : AbstractVerticle() {

  private lateinit var logger: Logger

  override fun init(vertx: Vertx, context: Context) {
    super.init(vertx, context)
    logger = LoggerFactory.getLogger("MainVerticle")
  }

  override fun start(startPromise: Promise<Void>) {
    val rpcServer = VertxServerBuilder
      .forAddress(vertx, "0.0.0.0", PORT)
      .build()

    rpcServer.start {
      logger.info("gRPC server listening on port $PORT")
      startPromise.complete()
    }
  }
}
