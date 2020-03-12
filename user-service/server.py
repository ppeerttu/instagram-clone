from concurrent import futures
from threading import Thread
import time
import grpc
import platform
import logging
import json
from app.codegen import user_service_pb2_grpc
from app.db.database import Database
from app.config import database_config, grpc_config, kafka_consumer_config, server_config, consul_config
from app.service_discovery import ServiceDiscovery
from app.utils import SignalDetector
from app.user_servicer import UserServicer
from app.user_service import UserService
from app.user_producer import UserProducer
from app.account_consumer import AccountConsumer
from app.liveness_handler import LivenessHandler

log_level = logging.INFO #logging.DEBUG if grpc_config["app_env"] is "development" else logging.INFO
logging.basicConfig(format="%(asctime)s %(process)d %(levelname)s %(name)s - %(message)s", level=log_level)
logger = logging.getLogger("server")

HTTP_PORT = int(server_config["port"])
CONSUL_ENABLED = consul_config["enabled"]

GRPC_SERVER_STARTED = False

HTTP_PORT = int(server_config["port"])
CONSUL_ENABLED = consul_config["enabled"]

GRPC_SERVER_STARTED = False

def get_error_handler(sd: ServiceDiscovery):
    """Higher-order function for generating error handler.
    
    Arguments:

        sd {ServiceDiscovery} -- The instance of ServiceDiscovery
    
    Returns:

        Callable[[Exception], None] -- The error handler function
    """
    def error_handler(e: Exception):
        """Handle exception by logging it and re-registering the service discovery.
        
        Arguments:

            e {Exception} -- The exception that occurred
        """
        logger.error(e)

        try:          
            sd.deregister()
            sd.register()
        except Exception as e:
            logger.warn("Re-registration to Consul failed: {e}")

    return error_handler

def grpc_alive() -> bool:
    return GRPC_SERVER_STARTED

def database_alive(db: Database) -> bool:
    return lambda: db.authenticate()

def service_discovery_alive(sd: ServiceDiscovery) -> bool:
    return lambda: sd.healthy

def account_consumer_healthy(consumer: AccountConsumer) -> bool:
    return lambda: consumer.healthy


if __name__ == "__main__":
    # Initialize services
    database = Database(database_config)
    producer = UserProducer()
    consumer = AccountConsumer(database)
    user_service = UserService(database, producer)
    sd = ServiceDiscovery()
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))

    # Prepare and start health check API
    health_checks = [
        grpc_alive,
        database_alive(database),
        service_discovery_alive(sd),
        account_consumer_healthy(consumer)
    ]
    health_server = LivenessHandler(HTTP_PORT, health_checks)
    health_server.listen()

    # Prepare and start gRPC API
    user_service_pb2_grpc.add_UserServicer_to_server(UserServicer(user_service), server)
    host = "0.0.0.0"
    port = grpc_config["port"]
    address = "{}:{}".format(host, port)
    server.add_insecure_port(address)
    server.start()
    GRPC_SERVER_STARTED = True
    logger.info("API server started, listening at {}".format(address))

    # Start account consumer
    consumer.start()

    if CONSUL_ENABLED:
        # Register this service into Consul
        sd.failed_heartbeat_handler = get_error_handler(sd)
        sd.register()
    else:
        logger.info("Consul not enabled, skipping config...")

    # Wait for shutdown/kill signal
    detector = SignalDetector()
    while not detector.signal_detected:
        time.sleep(1)

    logger.info("Received a signal. Starting clean up...")

    if sd.registered:
        sd.deregister()
        logger.debug("Deregistered from consul")

    server.stop(10).wait()
    logger.debug("Stopped gRPC server")

    consumer.stop()
    producer.clean_up()

    if database.authenticate():    
        database.connection.close()
        logger.debug("Closed database connection")

    health_server.stop()
    logger.info("Cleanup done, shutting down.")
    logger.shutdown()
