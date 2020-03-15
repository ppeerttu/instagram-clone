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
4. Create a network for local development: `docker network create ig-clone-dev`
5. Launch the containers by running `docker-compose up`
    * gRPC port is `3000` and fixed right now
6. The `nodemon` package is currently using `ts-node` in order to run TypeScript and will restart the server whenever any code changes
    * This might require some fine-tuning later

## Changing the proto interface

Whenever you change the `.proto` files, run `sh scripts/protoc.sh` in order to re-generate proper JavaScript and type definitions for TypeScript. This enables full type support when programming the gRPC handlers.

## Running in production

The application can be run whereever Node.s runs. This guide addresses only running with Docker, but the same idea can be applied everywhere, just see [the production Dockerfile](Dockerfile).

### Configuration

The application should be configured with environment variables. Here are all environment variables:

| Name                          | Example value(s)              | Default         | Description                       |
|-------------------------------|-------------------------------|-----------------|-----------------------------------|
| NODE_ENV                      | `development`, `production`   | `development` (not explicitly set but treated that way) | Running environment level |
| JWT_AUDIENCE        | `com.my-mobile.app` |         | JWT `aud` property (this is same for every client) |
| JWT_ISSUER      | `auth.my-app.com` |         | JWT `iss` property |
| JWT_ACCESS_SECRET | `rDKNsCYGxR46G5jatvDo...` |       | Strong secret for JWT signing (access token). See [JWT Secrets](#jwt-secrets) for more info. |
| JWT_REFRESH_SECRET | `JRivk6a7l3DdSRZAKn6fCw...` |          | Strong secret for JWT signing (refresh token). See [JWT Secrets](#jwt-secrets) for more info. |
| POSTGRES_HOST                 | `127.0.0.1`, `auth-db-dev` |          | PostgreSQL database hostname |
| POSTGRES_PORT | `5432` | `5432` | PostgreSQL database port number |
| POSTGRES_DB | `mydatabase` |        | PostgreSQL database name |
| POSTGRES_USER | `myuser` |          | PostgreSQL database username |
| POSTGRES_PASSWORD | `mypassword123` |         | PostgreSQL database password |
| CONSUL_HOST | `127.0.0.1`, `consul-dev` |         | Consul host address |
| CONSUL_CLIENT_NAME | `auth-service` | `auth-service` | The exposed service name in consul for this service |
| CONSUL_ENABLED | `false` | `true` | Whether to register the service to Consul or not |
| GRPC_PORT | `3000` | `3000` | The exposed port for gRPC server |
| REDIS_HOST | `127.0.0.1`, `redis` | `redis` | Hostname of Redis server |
| REDIS_PORT | `6379` | `6379` | Redis port number |
| KAFKA_SERVERS | `127.0.0.1:29092`, `kafka:9092` | `localhost:29092` | Kafka server address in form of `<host>:<port>` |
| KAFKA_ACCOUNT_TOPIC | `accounts` | `accounts` | Kafka topic to which account events are published from this service |
| HEALTH_CHECK_PORT | `4000` | `4000` | Port which the health check server will listen to |
| HEALTH_CHECK_PATH | `/health` | `/health` | URL path to which the health check server will bind the health check requests |

### JWT Secrets

Generate a strong JWT secret with the following command:

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Short secrets are vulnerable to brute-force attacks and thus long enough random string has to be used in production environments.

### Running the app


```bash
# Build the image
docker build -t image-service .

# Run the image, pick up env variables from ./image-service.env
docker run -p 3000:3000 -p 4000:4000 --env-file ./image-service.env image-service:latest
```

For `docker-compose` example, see [docker-compose.yml](docker-compose.yml).
