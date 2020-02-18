// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var comment_service_pb = require('./comment_service_pb.js');

function serialize_Comment_CreateCommentRequest(arg) {
  if (!(arg instanceof comment_service_pb.CreateCommentRequest)) {
    throw new Error('Expected argument of type Comment.CreateCommentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_CreateCommentRequest(buffer_arg) {
  return comment_service_pb.CreateCommentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_CreateCommentResponse(arg) {
  if (!(arg instanceof comment_service_pb.CreateCommentResponse)) {
    throw new Error('Expected argument of type Comment.CreateCommentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_CreateCommentResponse(buffer_arg) {
  return comment_service_pb.CreateCommentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_DeleteCommentRequest(arg) {
  if (!(arg instanceof comment_service_pb.DeleteCommentRequest)) {
    throw new Error('Expected argument of type Comment.DeleteCommentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_DeleteCommentRequest(buffer_arg) {
  return comment_service_pb.DeleteCommentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_DeleteCommentResponse(arg) {
  if (!(arg instanceof comment_service_pb.DeleteCommentResponse)) {
    throw new Error('Expected argument of type Comment.DeleteCommentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_DeleteCommentResponse(buffer_arg) {
  return comment_service_pb.DeleteCommentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentRequest(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentRequest)) {
    throw new Error('Expected argument of type Comment.GetCommentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentRequest(buffer_arg) {
  return comment_service_pb.GetCommentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentResponse(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentResponse)) {
    throw new Error('Expected argument of type Comment.GetCommentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentResponse(buffer_arg) {
  return comment_service_pb.GetCommentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentsByTagRequest(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentsByTagRequest)) {
    throw new Error('Expected argument of type Comment.GetCommentsByTagRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentsByTagRequest(buffer_arg) {
  return comment_service_pb.GetCommentsByTagRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentsByTagResponse(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentsByTagResponse)) {
    throw new Error('Expected argument of type Comment.GetCommentsByTagResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentsByTagResponse(buffer_arg) {
  return comment_service_pb.GetCommentsByTagResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentsByUserTagRequest(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentsByUserTagRequest)) {
    throw new Error('Expected argument of type Comment.GetCommentsByUserTagRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentsByUserTagRequest(buffer_arg) {
  return comment_service_pb.GetCommentsByUserTagRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Comment_GetCommentsByUserTagResponse(arg) {
  if (!(arg instanceof comment_service_pb.GetCommentsByUserTagResponse)) {
    throw new Error('Expected argument of type Comment.GetCommentsByUserTagResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment_GetCommentsByUserTagResponse(buffer_arg) {
  return comment_service_pb.GetCommentsByUserTagResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Comment service definition
var CommentsService = exports.CommentsService = {
  // Create new comment
createComment: {
    path: '/Comment.Comments/CreateComment',
    requestStream: false,
    responseStream: false,
    requestType: comment_service_pb.CreateCommentRequest,
    responseType: comment_service_pb.CreateCommentResponse,
    requestSerialize: serialize_Comment_CreateCommentRequest,
    requestDeserialize: deserialize_Comment_CreateCommentRequest,
    responseSerialize: serialize_Comment_CreateCommentResponse,
    responseDeserialize: deserialize_Comment_CreateCommentResponse,
  },
  // Get comment
getComment: {
    path: '/Comment.Comments/GetComment',
    requestStream: false,
    responseStream: false,
    requestType: comment_service_pb.GetCommentRequest,
    responseType: comment_service_pb.GetCommentResponse,
    requestSerialize: serialize_Comment_GetCommentRequest,
    requestDeserialize: deserialize_Comment_GetCommentRequest,
    responseSerialize: serialize_Comment_GetCommentResponse,
    responseDeserialize: deserialize_Comment_GetCommentResponse,
  },
  // Delete comment
deleteComment: {
    path: '/Comment.Comments/DeleteComment',
    requestStream: false,
    responseStream: false,
    requestType: comment_service_pb.DeleteCommentRequest,
    responseType: comment_service_pb.DeleteCommentResponse,
    requestSerialize: serialize_Comment_DeleteCommentRequest,
    requestDeserialize: deserialize_Comment_DeleteCommentRequest,
    responseSerialize: serialize_Comment_DeleteCommentResponse,
    responseDeserialize: deserialize_Comment_DeleteCommentResponse,
  },
  // Find Comments by hashtag
getCommentsByTag: {
    path: '/Comment.Comments/GetCommentsByTag',
    requestStream: false,
    responseStream: false,
    requestType: comment_service_pb.GetCommentsByTagRequest,
    responseType: comment_service_pb.GetCommentsByTagResponse,
    requestSerialize: serialize_Comment_GetCommentsByTagRequest,
    requestDeserialize: deserialize_Comment_GetCommentsByTagRequest,
    responseSerialize: serialize_Comment_GetCommentsByTagResponse,
    responseDeserialize: deserialize_Comment_GetCommentsByTagResponse,
  },
  // Find Comments by userTag
getCommentsByUserTag: {
    path: '/Comment.Comments/GetCommentsByUserTag',
    requestStream: false,
    responseStream: false,
    requestType: comment_service_pb.GetCommentsByUserTagRequest,
    responseType: comment_service_pb.GetCommentsByUserTagResponse,
    requestSerialize: serialize_Comment_GetCommentsByUserTagRequest,
    requestDeserialize: deserialize_Comment_GetCommentsByUserTagRequest,
    responseSerialize: serialize_Comment_GetCommentsByUserTagResponse,
    responseDeserialize: deserialize_Comment_GetCommentsByUserTagResponse,
  },
};

exports.CommentsClient = grpc.makeGenericClientConstructor(CommentsService);
