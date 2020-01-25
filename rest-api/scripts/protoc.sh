#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

# Services that we want to use
FILE_PATHS=(../auth-service/src/proto/*)
# Output for JavaScript and type definition files
OUT_DIR=src/client/generated

# Loop through FILE_PATHS
for dir in $FILE_PATHS; do

    # Loop through files in directory
    for f in $dir; do
        # Skip non-proto files
        if [ "$(basename "$f")" == "index.ts" ]; then
            continue
        fi

        # JavaScript code generating
        ${GRPC_TOOLS_NODE_PROTOC} \
            --js_out=import_style=commonjs,binary:${OUT_DIR} \
            --grpc_out=${OUT_DIR} \
            --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
            -I "${f}" \
            "${f}"/*.proto

        # Type definition generation
        ${GRPC_TOOLS_NODE_PROTOC} \
            --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
            --ts_out=${OUT_DIR} \
            -I "${f}" \
            "${f}"/*.proto
    done

done

