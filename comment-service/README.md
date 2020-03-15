# Comments service

This application was generated using http://start.vertx.io

## Requirements

Running the application locally you need Java 1.8.
You also might need to give execution permissions to the mvn wrapper ./mvnw

## Running (with docker)

1. Build (fat) jar with `./mvnw clean package`
2. Create data volume for mongo: `docker volume create comments-data-dev`
2. run `docker-compose up`
3. grpc server is running on port 3001

## Developing

When using intellij open this folder as the project root to get java support right away.

After making changes to proto file, packaging (`./mvnw clean package`) should compile the protofiles.
To launch tests:
`./mvnw clean test`

Simply running locally:
`./mvnw clean compile exec:java`


## Configuration


The local configuration is located at [conf/config.json](conf/config.json). In case you run the image using Docker (and `docker-compose`), those configurations are overwritten by environment variables. See [docker-compose.yml](docker-compose.yml) as an example. All possible configuration variables are listed below.

| Name               | Example value(s)      | Default         | Description   |
|--------------------|-----------------------|-----------------|---------------|
| GRPC_HOST | `0.0.0.0`     | `0.0.0.0` | The network address to which the gRPC server will bind |
| GRPC_PORT | `3000`    | `3000`    | The port to which the gRPC server will bind |
| CONSUL_HOST | `127.0.0.1`, `consul` | `localhost` | The Consul host address |
| CONSUL_PORT | `8500` | `8500` | The Consul port |
| CONSUL_ENABLED | `false` | `true` | Whether to publish this service to Consul or not |
| MONGO_USER | `comment-service` | `dev-service` | MongoDB username |
| MONGO_PASSWORD | `mypassword` | `dev-service` | MongoDB password |
| MONGO_HOST | `127.0.0.1`, `mongodb` | `localhost` | MongoDB hostname |
| MONGO_PORT | `27017` | `27017` | MongoDB port number |
| MONGO_DB_NAME | `images` | `images` | MongoDB database name |
| KAFKA_SERVERS | `kafka:9092` | `localhost:29092` | Kafka address in form of `<host>:<port>` |
| IMAGES_TOPIC | `images` | `images` | Kafka topic for image events (consuming) |
| KAFKA_CONSUMER_GROUP | `comment-service` | `comment-service` | Kafka consumer group name (for user events) |
| WEB_SERVER_PORT | `80` | `8080` | Port number to which the health check web server will bind | 

