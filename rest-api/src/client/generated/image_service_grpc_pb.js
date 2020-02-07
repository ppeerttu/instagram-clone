// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var image_service_pb = require('./image_service_pb.js');

function serialize_Image_CreateImageRequest(arg) {
  if (!(arg instanceof image_service_pb.CreateImageRequest)) {
    throw new Error('Expected argument of type Image.CreateImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_CreateImageRequest(buffer_arg) {
  return image_service_pb.CreateImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_CreateImageResponse(arg) {
  if (!(arg instanceof image_service_pb.CreateImageResponse)) {
    throw new Error('Expected argument of type Image.CreateImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_CreateImageResponse(buffer_arg) {
  return image_service_pb.CreateImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_DeleteImageRequest(arg) {
  if (!(arg instanceof image_service_pb.DeleteImageRequest)) {
    throw new Error('Expected argument of type Image.DeleteImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_DeleteImageRequest(buffer_arg) {
  return image_service_pb.DeleteImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_DeleteImageResponse(arg) {
  if (!(arg instanceof image_service_pb.DeleteImageResponse)) {
    throw new Error('Expected argument of type Image.DeleteImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_DeleteImageResponse(buffer_arg) {
  return image_service_pb.DeleteImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetImageDataRequest(arg) {
  if (!(arg instanceof image_service_pb.GetImageDataRequest)) {
    throw new Error('Expected argument of type Image.GetImageDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetImageDataRequest(buffer_arg) {
  return image_service_pb.GetImageDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetImageDataResponse(arg) {
  if (!(arg instanceof image_service_pb.GetImageDataResponse)) {
    throw new Error('Expected argument of type Image.GetImageDataResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetImageDataResponse(buffer_arg) {
  return image_service_pb.GetImageDataResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetImageRequest(arg) {
  if (!(arg instanceof image_service_pb.GetImageRequest)) {
    throw new Error('Expected argument of type Image.GetImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetImageRequest(buffer_arg) {
  return image_service_pb.GetImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetImageResponse(arg) {
  if (!(arg instanceof image_service_pb.GetImageResponse)) {
    throw new Error('Expected argument of type Image.GetImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetImageResponse(buffer_arg) {
  return image_service_pb.GetImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetUserImagesRequest(arg) {
  if (!(arg instanceof image_service_pb.GetUserImagesRequest)) {
    throw new Error('Expected argument of type Image.GetUserImagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetUserImagesRequest(buffer_arg) {
  return image_service_pb.GetUserImagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_GetUserImagesResponse(arg) {
  if (!(arg instanceof image_service_pb.GetUserImagesResponse)) {
    throw new Error('Expected argument of type Image.GetUserImagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_GetUserImagesResponse(buffer_arg) {
  return image_service_pb.GetUserImagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_SearchImagesRequest(arg) {
  if (!(arg instanceof image_service_pb.SearchImagesRequest)) {
    throw new Error('Expected argument of type Image.SearchImagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_SearchImagesRequest(buffer_arg) {
  return image_service_pb.SearchImagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image_SearchImagesResponse(arg) {
  if (!(arg instanceof image_service_pb.SearchImagesResponse)) {
    throw new Error('Expected argument of type Image.SearchImagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image_SearchImagesResponse(buffer_arg) {
  return image_service_pb.SearchImagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service that is exposed via gRPC
var ImagesService = exports.ImagesService = {
  // Create a new image
createImage: {
    path: '/Image.Images/CreateImage',
    requestStream: true,
    responseStream: false,
    requestType: image_service_pb.CreateImageRequest,
    responseType: image_service_pb.CreateImageResponse,
    requestSerialize: serialize_Image_CreateImageRequest,
    requestDeserialize: deserialize_Image_CreateImageRequest,
    responseSerialize: serialize_Image_CreateImageResponse,
    responseDeserialize: deserialize_Image_CreateImageResponse,
  },
  // Delete an image
deleteImage: {
    path: '/Image.Images/DeleteImage',
    requestStream: false,
    responseStream: false,
    requestType: image_service_pb.DeleteImageRequest,
    responseType: image_service_pb.DeleteImageResponse,
    requestSerialize: serialize_Image_DeleteImageRequest,
    requestDeserialize: deserialize_Image_DeleteImageRequest,
    responseSerialize: serialize_Image_DeleteImageResponse,
    responseDeserialize: deserialize_Image_DeleteImageResponse,
  },
  // Get a single image (metadata)
getImage: {
    path: '/Image.Images/GetImage',
    requestStream: false,
    responseStream: false,
    requestType: image_service_pb.GetImageRequest,
    responseType: image_service_pb.GetImageResponse,
    requestSerialize: serialize_Image_GetImageRequest,
    requestDeserialize: deserialize_Image_GetImageRequest,
    responseSerialize: serialize_Image_GetImageResponse,
    responseDeserialize: deserialize_Image_GetImageResponse,
  },
  // Get image data
getImageData: {
    path: '/Image.Images/GetImageData',
    requestStream: false,
    responseStream: false,
    requestType: image_service_pb.GetImageDataRequest,
    responseType: image_service_pb.GetImageDataResponse,
    requestSerialize: serialize_Image_GetImageDataRequest,
    requestDeserialize: deserialize_Image_GetImageDataRequest,
    responseSerialize: serialize_Image_GetImageDataResponse,
    responseDeserialize: deserialize_Image_GetImageDataResponse,
  },
  // Get user's images
getUserImages: {
    path: '/Image.Images/GetUserImages',
    requestStream: false,
    responseStream: false,
    requestType: image_service_pb.GetUserImagesRequest,
    responseType: image_service_pb.GetUserImagesResponse,
    requestSerialize: serialize_Image_GetUserImagesRequest,
    requestDeserialize: deserialize_Image_GetUserImagesRequest,
    responseSerialize: serialize_Image_GetUserImagesResponse,
    responseDeserialize: deserialize_Image_GetUserImagesResponse,
  },
  // Search for images based on hash tags or user tags
searchImages: {
    path: '/Image.Images/SearchImages',
    requestStream: false,
    responseStream: false,
    requestType: image_service_pb.SearchImagesRequest,
    responseType: image_service_pb.SearchImagesResponse,
    requestSerialize: serialize_Image_SearchImagesRequest,
    requestDeserialize: deserialize_Image_SearchImagesRequest,
    responseSerialize: serialize_Image_SearchImagesResponse,
    responseDeserialize: deserialize_Image_SearchImagesResponse,
  },
};

exports.ImagesClient = grpc.makeGenericClientConstructor(ImagesService);
