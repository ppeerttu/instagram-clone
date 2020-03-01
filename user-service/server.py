from concurrent import futures
from threading import Thread
import time
import grpc
import platform
import logging
import json
from app.codegen import user_service_pb2_grpc
from app.db.database import Database
from app.config import database_config, grpc_config, kafka_consumer_config
from app.service_discovery import ServiceDiscovery
from app.utils import SignalDetector
from app.user_servicer import UserServicer
from app.user_service import UserService
from app.user_producer import UserProducer
from app.account_consumer import AccountConsumer

log_level = logging.INFO #logging.DEBUG if grpc_config["app_env"] is "development" else logging.INFO
logging.basicConfig(format="%(asctime)s %(process)d %(levelname)s %(name)s - %(message)s", level=log_level)

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
        logging.error(e)

        try:          
            sd.deregister()
            sd.register()
        except Exception as e:
            logging.warn("Re-registration to Consul failed: {e}")

    return error_handler
  

if __name__ == "__main__":
    database = Database(database_config)
    producer = UserProducer()
    consumer = AccountConsumer(database)
    user_service = UserService(database, producer)

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    user_service_pb2_grpc.add_UserServicer_to_server(UserServicer(user_service), server)
    host = "0.0.0.0"
    port = grpc_config["port"]
    address = "{}:{}".format(host, port)
    server.add_insecure_port(address)
    server.start()
    logging.info("API server started, listening at {}".format(address))
    consumer.start()

    # Register this service into Consul
    sd = ServiceDiscovery()
    sd.failed_heartbeat_handler = get_error_handler(sd)
    sd.register()

    # Wait for shutdown/kill signal
    detector = SignalDetector()
    while not detector.signal_detected:
        time.sleep(1)

    logging.info("Received a signal. Starting clean up...")

    if sd.registered:
        sd.deregister()
        logging.debug("Deregistered from consul")

    server.stop(10).wait()
    logging.debug("Stopped gRPC server")

    consumer.stop()

    if database.authenticate():    
        database.connection.close()
        logging.debug("Closed database connection")

    logging.info("Cleanup done, shutting down.")
    logging.shutdown()

