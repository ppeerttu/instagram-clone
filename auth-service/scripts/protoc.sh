#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

INPUT_DIR="./proto"
OUTPUT_DIR="./src/proto/generated/"

echo "Reading from $INPUT_DIR";

# Loop through files in INPUT_DIR
for f in ${INPUT_DIR}/*; do

    # Skip the non proto files
    if [ ${f: -6} != ".proto" ]; then
        continue
    fi

    echo "Compiling $f";

    ${GRPC_TOOLS_NODE_PROTOC} \
        --js_out=import_style=commonjs,binary:"${OUTPUT_DIR}" \
        --grpc_out="${OUTPUT_DIR}" \
        --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
        -I "${INPUT_DIR}" \
        "${f}"

    ${GRPC_TOOLS_NODE_PROTOC} \
        --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
        --ts_out="${OUTPUT_DIR}" \
        -I "${INPUT_DIR}" \
        "${f}"

done

echo "Done";
