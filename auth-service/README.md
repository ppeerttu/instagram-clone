# auth-service

Authentication service for the Instagram clone project implemented with Node.js and TypeScript.

## Requirements

* Docker
  * In case you don't want to use it, you'll have to install PostgreSQL
  * Environment variables are currently managed via Docker
* Node.JS v10 or up
  * Not mandatory if you want to only **run** the app by using Docker

**Hint**: In case you want to test gRPC calls, install BloomingRPC.

## Getting started

To get started with the development, follow these steps:

1. Install depenencies by issuing `npm install`
2. Populate environment variable files
    * Create `.auth.env` and `.db.env` out of [example.auth.env](example.auth.env) and [example.db.env](example.db.env)
3. Create a data volume for local development: `docker volume create auth-data-dev`
4. Launch the containers by running `docker-compose up`
    * gRPC port is `3000` and fixed right now
5. The `nodemon` package is currently using `ts-node` in order to run TypeScript and will restart the server whenever any code changes
    * This might require some fine-tuning later

## Changing the proto interface

Whenever you change the `.proto` files, run `sh scripts/protoc.sh` in order to re-generate proper JavaScript and type definitions for TypeScript. This enables full type support when programming the gRPC handlers.
