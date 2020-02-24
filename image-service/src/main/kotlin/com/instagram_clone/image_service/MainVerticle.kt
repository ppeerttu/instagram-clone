package com.instagram_clone.image_service

import com.instagram_clone.image_service.config.AppConfig
import com.instagram_clone.image_service.service.ImageFileServiceVertxImpl
import com.instagram_clone.image_service.grpc.ImageServiceGrpcImpl
import com.instagram_clone.image_service.message_broker.KafkaService
import com.instagram_clone.image_service.service.ImageMetaServiceMongoImpl
import io.vertx.config.ConfigRetriever
import io.vertx.core.AbstractVerticle
import io.vertx.core.Context
import io.vertx.core.Promise
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.consul.CheckOptions
import io.vertx.ext.consul.ConsulClient
import io.vertx.ext.consul.ConsulClientOptions
import io.vertx.ext.consul.ServiceOptions
import io.vertx.ext.mongo.MongoClient
import io.vertx.grpc.VertxServerBuilder
import io.vertx.kafka.client.producer.KafkaProducer
import java.net.InetAddress
import java.util.*
import kotlin.collections.HashMap
import kotlin.concurrent.fixedRateTimer

const val SERVICE_NAME = "image-service"

class MainVerticle : AbstractVerticle() {

  private lateinit var logger: Logger

  private var timer: Timer? = null

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

        val mongoClient = configureMongo(config)
        val producer = configureKafkaProducer(config)
        val messageBroker = KafkaService(producer)
        val imageMetaService = ImageMetaServiceMongoImpl(mongoClient)
        val imageFileService = ImageFileServiceVertxImpl(vertx)
        val grpcService: ImagesGrpc.ImagesImplBase = ImageServiceGrpcImpl(
          imageMetaService,
          imageFileService,
          messageBroker
        )

        val rpcServer = VertxServerBuilder
          .forAddress(vertx, config.grpcHost, config.grpcPort)
          .addService(grpcService)
          .build()

        rpcServer.start {
          logger.info("gRPC server listening on port ${config.grpcPort}")
          configureConsul(config)
          startPromise.complete()
        }
      }
    }
  }

  private fun configureConsul(config: AppConfig) {
    val options = ConsulClientOptions()
    options.host = config.consulHost
    options.port = config.consulPort
    val consulClient = ConsulClient.create(vertx, options)
    registerService(config, consulClient)
  }


  private fun registerService(config: AppConfig, client: ConsulClient) {
    val options = ServiceOptions()
    options.name = SERVICE_NAME
    options.id = UUID.randomUUID().toString()
    options.port = config.grpcPort
    options.address = InetAddress.getLocalHost().hostName
    options.checkOptions = CheckOptions().also {
      it.ttl = "10s"
      it.deregisterAfter = "5m"
    }
    client.registerService(options) {
      if (it.succeeded()) {
        logger.info("Registered service ${options.id} to consul with name: $SERVICE_NAME")
        registerOnShutdownHook(client, options.id)
        timer = fixedRateTimer("health-check", period = 5000) {
          client.passCheck("service:${options.id}") {
            if (!it.succeeded()) {
              logger.error("Heartbeat failed:", it.cause())
            }
          }
        }
      } else {
        logger.error("Failed to register service to consul, cause:", it.cause())
      }
    }
  }

  private fun configureMongo(config: AppConfig): MongoClient {
    val user = config.mongoUser
    val pass = config.mongoPassword
    val host = config.mongoHost
    val port = config.mongoPort
    val db = config.mongoDatabase
    val conn = "mongodb://$user:$pass@$host:$port/$db"
    logger.info("Mongo config: $user:****@$host:$port/$db")
    return MongoClient.createShared(
      vertx,
      JsonObject()
        .put("connection_string", conn)
        .put("db_name", db)
    )
  }

  private fun configureKafkaProducer(config: AppConfig): KafkaProducer<Nothing, String> {
    val kafkaConf = HashMap<String, String>().also {
      it["bootstrap.servers"] = config.kafkaServers
      // These serializers could be JsonObjectSerializers, but we do serialization on service layer now
      it["key.serializer"] = "org.apache.kafka.common.serialization.StringSerializer"
      it["value.serializer"] = "org.apache.kafka.common.serialization.StringSerializer"
      it["acks"] = "1"
    }
    return KafkaProducer.create(vertx, kafkaConf)
  }

  /**
   * Register cleanup operations before shutting down.
   *
   * @todo Implement this properly
   */
  private fun registerOnShutdownHook(client: ConsulClient, id: String) {
    Runtime.getRuntime().addShutdownHook(Thread {
      fun run() {
        logger.info("Cleaning up...")
        timer?.cancel()
        client.deregisterService(id) {
          logger.info("Service $id deregistered from consul")
        }
      }
    })
  }
}
