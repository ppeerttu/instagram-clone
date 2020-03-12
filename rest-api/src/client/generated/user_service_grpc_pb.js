// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_service_pb = require('./user_service_pb.js');

function serialize_User_CreateUserResponse(arg) {
  if (!(arg instanceof user_service_pb.CreateUserResponse)) {
    throw new Error('Expected argument of type User.CreateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_CreateUserResponse(buffer_arg) {
  return user_service_pb.CreateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_DeleteUserRequest(arg) {
  if (!(arg instanceof user_service_pb.DeleteUserRequest)) {
    throw new Error('Expected argument of type User.DeleteUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_DeleteUserRequest(buffer_arg) {
  return user_service_pb.DeleteUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_DeleteUserResponse(arg) {
  if (!(arg instanceof user_service_pb.DeleteUserResponse)) {
    throw new Error('Expected argument of type User.DeleteUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_DeleteUserResponse(buffer_arg) {
  return user_service_pb.DeleteUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserRequest(arg) {
  if (!(arg instanceof user_service_pb.GetUserRequest)) {
    throw new Error('Expected argument of type User.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserRequest(buffer_arg) {
  return user_service_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_GetUserResponse(arg) {
  if (!(arg instanceof user_service_pb.GetUserResponse)) {
    throw new Error('Expected argument of type User.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_GetUserResponse(buffer_arg) {
  return user_service_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User_NewUser(arg) {
  if (!(arg instanceof user_service_pb.NewUser)) {
    throw new Error('Expected argument of type User.NewUser');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User_NewUser(buffer_arg) {
  return user_service_pb.NewUser.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  // Create user
create: {
    path: '/User.User/Create',
    requestStream: false,
    responseStream: false,
    requestType: user_service_pb.NewUser,
    responseType: user_service_pb.CreateUserResponse,
    requestSerialize: serialize_User_NewUser,
    requestDeserialize: deserialize_User_NewUser,
    responseSerialize: serialize_User_CreateUserResponse,
    responseDeserialize: deserialize_User_CreateUserResponse,
  },
  // Update user (?)
//
// Delete user
delete: {
    path: '/User.User/Delete',
    requestStream: false,
    responseStream: false,
    requestType: user_service_pb.DeleteUserRequest,
    responseType: user_service_pb.DeleteUserResponse,
    requestSerialize: serialize_User_DeleteUserRequest,
    requestDeserialize: deserialize_User_DeleteUserRequest,
    responseSerialize: serialize_User_DeleteUserResponse,
    responseDeserialize: deserialize_User_DeleteUserResponse,
  },
  // Get user
getUser: {
    path: '/User.User/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: user_service_pb.GetUserRequest,
    responseType: user_service_pb.GetUserResponse,
    requestSerialize: serialize_User_GetUserRequest,
    requestDeserialize: deserialize_User_GetUserRequest,
    responseSerialize: serialize_User_GetUserResponse,
    responseDeserialize: deserialize_User_GetUserResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
