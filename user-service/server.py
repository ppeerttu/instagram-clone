from concurrent import futures
import time
import grpc
import platform
import logging
from app.codegen import user_service_pb2, user_service_pb2_grpc
from app.db.database import Database
from app.models.user import User
from app.config import database_config, grpc_config
from app.db import exceptions
from app.service_discovery import ServiceDiscovery
from app.utils import SignalDetector

log_level = logging.DEBUG if grpc_config["app_env"] is "development" else logging.INFO
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

class UserServicer(user_service_pb2_grpc.UserServicer): 
    """Class implementing the gRPC API"""

    def __init__(self, database: Database):
        self.db = database

    def Create(self, request, context): 
        """Creates a new user"""
        username = request.username
        account_id = request.account_id
        user = User(id=account_id, username=username)
        logging.info("Received account id to create: " + account_id + "\n" + "recieved username: " + username)
        try:
            self.db.createUser(user)
            response = user_service_pb2.CreateUserResponse(
                status = "USER_CREATED"
            )
        except exceptions.IdExistsError:
            response = user_service_pb2.CreateUserResponse(
                status = "ACCOUNT_ID_ALREADY_EXISTS"
            )
        except exceptions.UsernameExistsError:
            response = user_service_pb2.CreateUserResponse(
                status = "USERNAME_ALREADY_EXISTS"
            )
        return response

    def Delete(self, request, context):
        """Delete a user"""
        account_id = request.account_id
        logging.info("Received account id to delete: " + account_id) 
        try:
            self.db.deleteUserById(account_id)
            response = user_service_pb2.DeleteUserResponse(
                status = "USER_DELETED"
            )
        except exceptions.EntityNotFoundError:
            response = user_service_pb2.DeleteUserResponse(
                status = "ACCOUNT_ID_NOT_EXIST"
            )
        return response

    def GetUser(self, request, context):
        """Gets a user.
           gRPC calls this method when clients call the GetUser rpc (method).
        Arguments:
            request (GetUserRequest): The incoming request.
            context: The gRPC connection context.
        
        Returns:
            user (User): A user.
        """
        account_id = request.account_id
        logging.info("Received account id: " + account_id)
        result= self.db.findUserById(account_id)
        user = user_service_pb2.UserInfo()
        user.id = result.id
        user.username = result.username
        user.created_at = result.created_at.isoformat()
        user.updated_at = result.updated_at.isoformat()
        response = user_service_pb2.GetUserResponse(
            user = user
        )
        
        return response
            

if __name__ == "__main__":
    # Run a gRPC server with one thread.
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    database = Database(database_config)
    # Adds the servicer class to the server.
    user_service_pb2_grpc.add_UserServicer_to_server(UserServicer(database), server)
    host = "0.0.0.0"
    port = grpc_config["port"]
    address = "{}:{}".format(host, port)
    server.add_insecure_port(address)
    server.start()
    logging.info("API server started, istening at {}".format(address))

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

    if database.authenticate():    
        database.connection.close()
        logging.debug("Closed database connection")

    logging.info("Cleanup done, shutting down.")
    logging.shutdown()

