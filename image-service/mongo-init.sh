#!/bin/sh
# Sourced from https://github.com/docker-library/mongo/issues/257

set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
    user: '$MONGO_USER',
    pwd: '$MONGO_PASSWORD',
    roles: [
        "readWrite"
    ]
})
EOF
