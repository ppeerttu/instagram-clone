package com.instagram_clone.image_service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.config.ConfigConstants
import com.instagram_clone.image_service.service.ImageServiceGrpcImpl
import com.instagram_clone.image_service.service.ImageMetaServiceMockImpl
import io.vertx.config.ConfigRetriever
import io.vertx.core.AbstractVerticle
import io.vertx.core.Context
import io.vertx.core.Promise
import io.vertx.core.Vertx
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.grpc.VertxServerBuilder

class MainVerticle : AbstractVerticle() {

  private lateinit var logger: Logger

  override fun init(vertx: Vertx, context: Context) {
    super.init(vertx, context)
    logger = LoggerFactory.getLogger("MainVerticle")
  }

  override fun start(startPromise: Promise<Void>) {
    ConfigRetriever.create(vertx).getConfig { ar ->
      if (ar.failed()) {
        logger.error("Error retrieving config:", ar.cause())
        startPromise.complete()
      } else {
        val json = ar.result()
        val config = AppConfig.getInstance(json)

        val imageMetaService = ImageMetaServiceMockImpl()
        val grpcService: ImagesGrpc.ImagesImplBase = ImageServiceGrpcImpl(imageMetaService, vertx)

        val rpcServer = VertxServerBuilder
          .forAddress(vertx, config.host, config.port)
          .addService(grpcService)
          .build()

        rpcServer.start {
          logger.info("gRPC server listening on port ${config.port}")
          startPromise.complete()
        }
      }
    }
  }
}
