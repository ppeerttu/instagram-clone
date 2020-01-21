// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_service_pb = require('./auth_service_pb.js');

function serialize_AccountInfo(arg) {
  if (!(arg instanceof auth_service_pb.AccountInfo)) {
    throw new Error('Expected argument of type AccountInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AccountInfo(buffer_arg) {
  return auth_service_pb.AccountInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AccountRequest(arg) {
  if (!(arg instanceof auth_service_pb.AccountRequest)) {
    throw new Error('Expected argument of type AccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AccountRequest(buffer_arg) {
  return auth_service_pb.AccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_JWTTokens(arg) {
  if (!(arg instanceof auth_service_pb.JWTTokens)) {
    throw new Error('Expected argument of type JWTTokens');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_JWTTokens(buffer_arg) {
  return auth_service_pb.JWTTokens.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RenewRequest(arg) {
  if (!(arg instanceof auth_service_pb.RenewRequest)) {
    throw new Error('Expected argument of type RenewRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RenewRequest(buffer_arg) {
  return auth_service_pb.RenewRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserCredentials(arg) {
  if (!(arg instanceof auth_service_pb.UserCredentials)) {
    throw new Error('Expected argument of type UserCredentials');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserCredentials(buffer_arg) {
  return auth_service_pb.UserCredentials.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthService = exports.AuthService = {
  signIn: {
    path: '/Auth/SignIn',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.UserCredentials,
    responseType: auth_service_pb.JWTTokens,
    requestSerialize: serialize_UserCredentials,
    requestDeserialize: deserialize_UserCredentials,
    responseSerialize: serialize_JWTTokens,
    responseDeserialize: deserialize_JWTTokens,
  },
  renewToken: {
    path: '/Auth/RenewToken',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.RenewRequest,
    responseType: auth_service_pb.JWTTokens,
    requestSerialize: serialize_RenewRequest,
    requestDeserialize: deserialize_RenewRequest,
    responseSerialize: serialize_JWTTokens,
    responseDeserialize: deserialize_JWTTokens,
  },
  getAccount: {
    path: '/Auth/GetAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.AccountRequest,
    responseType: auth_service_pb.AccountInfo,
    requestSerialize: serialize_AccountRequest,
    requestDeserialize: deserialize_AccountRequest,
    responseSerialize: serialize_AccountInfo,
    responseDeserialize: deserialize_AccountInfo,
  },
};

exports.AuthClient = grpc.makeGenericClientConstructor(AuthService);
