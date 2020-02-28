from concurrent import futures
import time
import grpc
import platform
from app.codegen import user_service_pb2, user_service_pb2_grpc
from app.db.database import Database
from app.models.user import User
from app.config import database_config
from app.db import exceptions

# Inherit from example_pb2_grpc.ExampleServiceServicer
# ExampleServiceServicer is the server-side artifact.
class UserServicer(user_service_pb2_grpc.UserServicer): 

    def __init__(self, database: Database):
        self.db = database

    def Create(self, request, context): 
        """Creates a new user"""
        username = request.username
        account_id = request.account_id
        user = User(id=account_id, username=username)
        print("Received account id to create: " + account_id + "\n" + "recieved username: " + username)
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
        print("Received account id to delete: " + account_id) 
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
        print("Received account id: " + account_id)
        result= self.db.findUserById(account_id)
        user = user_service_pb2.UserInfo()
        user.id = result.id
        user.username = result.username
        user.created_at = result.created_at.strftime("%d-%b-%Y (%H:%M:%S.%f)")
        user.updated_at = result.updated_at.strftime("%d-%b-%Y (%H:%M:%S.%f)")
        response = user_service_pb2.GetUserResponse(
            user = user
        )
        
        return response
            

if __name__ == '__main__':
    # Run a gRPC server with one thread.
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    database = Database(database_config)
    # Adds the servicer class to the server.
    user_service_pb2_grpc.add_UserServicer_to_server(UserServicer(database), server)
    server.add_insecure_port('0.0.0.0:8080')
    server.start()
    print('API server started. Listening at 0.0.0.0:8080.')
    while True:
        time.sleep(60)
