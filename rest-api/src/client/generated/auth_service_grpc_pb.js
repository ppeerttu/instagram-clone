// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var auth_service_pb = require('./auth_service_pb.js');

function serialize_Auth_AccountRequest(arg) {
  if (!(arg instanceof auth_service_pb.AccountRequest)) {
    throw new Error('Expected argument of type Auth.AccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_AccountRequest(buffer_arg) {
  return auth_service_pb.AccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_AccountResponse(arg) {
  if (!(arg instanceof auth_service_pb.AccountResponse)) {
    throw new Error('Expected argument of type Auth.AccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_AccountResponse(buffer_arg) {
  return auth_service_pb.AccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_DeleteAccountRequest(arg) {
  if (!(arg instanceof auth_service_pb.DeleteAccountRequest)) {
    throw new Error('Expected argument of type Auth.DeleteAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_DeleteAccountRequest(buffer_arg) {
  return auth_service_pb.DeleteAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_DeleteAccountResponse(arg) {
  if (!(arg instanceof auth_service_pb.DeleteAccountResponse)) {
    throw new Error('Expected argument of type Auth.DeleteAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_DeleteAccountResponse(buffer_arg) {
  return auth_service_pb.DeleteAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_NewAccount(arg) {
  if (!(arg instanceof auth_service_pb.NewAccount)) {
    throw new Error('Expected argument of type Auth.NewAccount');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_NewAccount(buffer_arg) {
  return auth_service_pb.NewAccount.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_RenewRequest(arg) {
  if (!(arg instanceof auth_service_pb.RenewRequest)) {
    throw new Error('Expected argument of type Auth.RenewRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_RenewRequest(buffer_arg) {
  return auth_service_pb.RenewRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_RenewResponse(arg) {
  if (!(arg instanceof auth_service_pb.RenewResponse)) {
    throw new Error('Expected argument of type Auth.RenewResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_RenewResponse(buffer_arg) {
  return auth_service_pb.RenewResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_SignInResponse(arg) {
  if (!(arg instanceof auth_service_pb.SignInResponse)) {
    throw new Error('Expected argument of type Auth.SignInResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_SignInResponse(buffer_arg) {
  return auth_service_pb.SignInResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_SignUpResponse(arg) {
  if (!(arg instanceof auth_service_pb.SignUpResponse)) {
    throw new Error('Expected argument of type Auth.SignUpResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_SignUpResponse(buffer_arg) {
  return auth_service_pb.SignUpResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Auth_UserCredentials(arg) {
  if (!(arg instanceof auth_service_pb.UserCredentials)) {
    throw new Error('Expected argument of type Auth.UserCredentials');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Auth_UserCredentials(buffer_arg) {
  return auth_service_pb.UserCredentials.deserializeBinary(new Uint8Array(buffer_arg));
}


// Authentication service definition
var AuthService = exports.AuthService = {
  // Sign up a new user account
signUp: {
    path: '/Auth.Auth/SignUp',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.NewAccount,
    responseType: auth_service_pb.SignUpResponse,
    requestSerialize: serialize_Auth_NewAccount,
    requestDeserialize: deserialize_Auth_NewAccount,
    responseSerialize: serialize_Auth_SignUpResponse,
    responseDeserialize: deserialize_Auth_SignUpResponse,
  },
  // Sign the user in, get proper tokens as response
signIn: {
    path: '/Auth.Auth/SignIn',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.UserCredentials,
    responseType: auth_service_pb.SignInResponse,
    requestSerialize: serialize_Auth_UserCredentials,
    requestDeserialize: deserialize_Auth_UserCredentials,
    responseSerialize: serialize_Auth_SignInResponse,
    responseDeserialize: deserialize_Auth_SignInResponse,
  },
  // Get a new pair of access and refresh tokens
renewToken: {
    path: '/Auth.Auth/RenewToken',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.RenewRequest,
    responseType: auth_service_pb.RenewResponse,
    requestSerialize: serialize_Auth_RenewRequest,
    requestDeserialize: deserialize_Auth_RenewRequest,
    responseSerialize: serialize_Auth_RenewResponse,
    responseDeserialize: deserialize_Auth_RenewResponse,
  },
  // Get account details based on access token
getAccount: {
    path: '/Auth.Auth/GetAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.AccountRequest,
    responseType: auth_service_pb.AccountResponse,
    requestSerialize: serialize_Auth_AccountRequest,
    requestDeserialize: deserialize_Auth_AccountRequest,
    responseSerialize: serialize_Auth_AccountResponse,
    responseDeserialize: deserialize_Auth_AccountResponse,
  },
  deleteAccount: {
    path: '/Auth.Auth/DeleteAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_service_pb.DeleteAccountRequest,
    responseType: auth_service_pb.DeleteAccountResponse,
    requestSerialize: serialize_Auth_DeleteAccountRequest,
    requestDeserialize: deserialize_Auth_DeleteAccountRequest,
    responseSerialize: serialize_Auth_DeleteAccountResponse,
    responseDeserialize: deserialize_Auth_DeleteAccountResponse,
  },
};

exports.AuthClient = grpc.makeGenericClientConstructor(AuthService);
