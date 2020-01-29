package com.instagram_clone.comment_service

import com.instagram_clone.comment_service.grpc.CommentServiceGrpcImpl
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
import io.vertx.kotlin.core.json.get
import java.lang.ClassCastException

class MainVerticle : AbstractVerticle() {

  private lateinit var logger: Logger
  private lateinit var mongoClient: MongoClient
  private lateinit var config: JsonObject

  override fun init(vertx: Vertx, context: Context) {
    super.init(vertx, context)
    logger = LoggerFactory.getLogger("MainVerticle")
  }

  override fun start(startPromise: Promise<Void>) {
    val commentService = CommentServiceMockImpl()
    val service: CommentsGrpc.CommentsImplBase = CommentServiceGrpcImpl(commentService)
    val configRetriever = ConfigRetriever.create(vertx)
    configRetriever.getConfig {
      if (it.succeeded()) {
        config = it.result()
        logger.info("Config : $config")
        val mongoUser = config.getString(Constants.MONGO_KEY_USER)
        val mongoPwd = config.getString(Constants.MONGO_KEY_PASSWORD)
        val mongoDb = config.getString(Constants.MONGO_KEY_DB_NAME)
        val mongoPort = try {
          config.getString(Constants.MONGO_KEY_PORT)
        } catch (e: ClassCastException) {
          config.getDouble(Constants.MONGO_KEY_PORT).toString().substringBeforeLast(".")
        }
//        val mongoPort = config.getString(Constants.MONGO_KEY_PORT)
        val mongoHost = config.getString(Constants.MONGO_KEY_HOST)
        val connString = "mongodb://$mongoUser:$mongoPwd@$mongoHost:$mongoPort/$mongoDb"
        logger.info("Mongo db: $mongoDb\nuser: $mongoUser\nport: $mongoPort\nhost: $mongoHost")
        val mongoConfig = JsonObject()
        mongoConfig.put("db_name", mongoDb)
        mongoConfig.put("connection_string", connString)
        mongoClient = MongoClient.createShared(vertx, mongoConfig)
        val grpcPort = try {
          config.getString(Constants.GRPC_KEY_PORT)
        } catch (e: ClassCastException) {
          config.getDouble(Constants.GRPC_KEY_PORT).toString().substringBeforeLast(".")
        }
        val rpcServer = VertxServerBuilder
          .forAddress(vertx, config.getString(Constants.GRPC_KEY_HOST), grpcPort.toInt())
          .addService(service)
          .build()
        rpcServer.start()
        logger.info("Grpc server started")
      } else {
        logger.error("Failed to retrieve configurations")
      }
    }

    startPromise.complete()
  }
}
