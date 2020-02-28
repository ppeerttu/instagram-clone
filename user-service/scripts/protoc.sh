#!/bin/sh


python -m grpc_tools.protoc -I proto --python_out=app/codegen/ --grpc_python_out=app/codegen/ user_service.proto
