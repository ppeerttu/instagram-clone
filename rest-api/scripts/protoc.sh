#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

# Services that we want to use
INPUT_DIRS=("../auth-service/proto" "../image-service/src/main/proto")
# Output for JavaScript and type definition files
OUT_DIR=src/client/generated

# Loop through INPUT_DIRS
for dir in "${INPUT_DIRS[@]}"; do

    echo "Reading from $dir";

    # Loop through files in directory
    for f in $dir/*; do

        # Skip the non proto files
        if [ ${f: -6} != ".proto" ]; then
            continue
        fi

        echo "Compiling $f";

        # JavaScript code generating
        ${GRPC_TOOLS_NODE_PROTOC} \
            --js_out=import_style=commonjs,binary:"${OUT_DIR}" \
            --grpc_out="${OUT_DIR}" \
            --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
            -I "${dir}" \
            "${f}"

        # Type definition generation
        ${GRPC_TOOLS_NODE_PROTOC} \
            --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
            --ts_out=${OUT_DIR} \
            -I "${dir}" \
            "${f}"
    done

done

echo "Done";
