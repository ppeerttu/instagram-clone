# image-service

Image service for the Instagram clone system. This service is storing images and their metadata for users.

## Requirements

Running the application locally you need Java 1.8.
You also might need to give execution permissions to the mvn wrapper ./mvnw

## Running (with docker)

1. Build (fat) jar with `./mvnw clean package`
2. Create data volume for MongoDB: `docker volume create image-data-dev`
    * By default the app container requires a volume as well for raw image files, but it has already been set to [./data](./data)
3. Create `.env` -file out of [example.env](example.env) and fill in proper values
    * Most of the variables are already set in [docker-compose.yml](docker-compose.yml)
4. Run `docker-compose up`
5. gRPC server is running on host port 3002, container port 3000

## Developing

When using IntelliJ open this folder as the project root to get java support right away.

After making changes to proto file, packaging (`./mvnw clean package`) should compile the protofiles.
To launch tests:
`./mvnw clean test`

Simply running locally:
`./mvnw clean compile exec:java`

## Configuration

The local configuration is located at [conf/config.json](conf/config.json). In case you run the image using Docker (and `docker-compose`), those configurations are overwritten by environment variables. See [docker-compose.yml](docker-compose.yml) as an example. The `IMAGE_DATA_DIR` variable is populated during build, and persisting the image files on host can be done by using volume. All possible configuration variables are listed below.

| Name                          | Example value(s)              | Default         | Description                       |
|------------------------------|------------------------------|------|-------|
| GRPC_HOST | `0.0.0.0`     | `0.0.0.0` | The network address to which the gRPC server will bind |
| GRPC_PORT | `3000`    | `3000`    | The port to which the gRPC server will bind |
| IMAGE_DATA_DIR | `/app/image-data` | `/app/image-data` (from [Dockerfile](Dockerfile)) | The directory to which the image data is stored |
| CONSUL_HOST | `127.0.0.1`, `consul` | `127.0.0.1` | The Consul host address |
| CONSUL_PORT | `8500` | `8500` | The Consul port |
| CONSUL_ENABLED | `false` | `true` | Whether to publish this service to Consul or not |
| MONGO_USER | `image-service` | `image-service` | MongoDB username |
| MONGO_PASSWORD | `mypassword` | `image-service` | MongoDB password |
| MONGO_HOST | `127.0.0.1`, `mongodb` | `127.0.0.1` | MongoDB hostname |
| MONGO_PORT | `27017` | `27017` | MongoDB port number |
| MONGO_DATABASE | `images` | `images` | MongoDB database name |
| IMAGES_COLLECTION | `image_meta` | `image_meta` | MongoDB collection name for image metadata |
| LIKES_COLLECTION | `image_likes` | `image_likes` | MongoDB collection name for image likes |
| KAFKA_SERVERS | `localhost:29092` | `localhost:29092` | Kafka address in form of `<host>:<port>` |
| IMAGES_TOPIC | `images` | `images` | Kafka topic for image events (producing) |
| USERS_TOPIC | `users` | `users` | Kafka topic for user events (consuming) |
| KAFKA_CONSUMER_GROUP | `image-service` | `image-service` | Kafka consumer group name (for user events) |
| WEB_SERVER_PORT | `80` | `8080` | Port number to which the health check web server will bind | 



**Original Vert.x Starter documentation below**

----

This application was generated using [Vert.x Starter](http://start.vertx.io)

## Building

To launch your tests:
```
./mvnw clean test
```

To package your application:
```
./mvnw clean package
```

To run your application:
```
./mvnw clean compile exec:java
```

## Help

* [Vert.x Documentation](https://vertx.io/docs/)
* [Vert.x Stack Overflow](https://stackoverflow.com/questions/tagged/vert.x?sort=newest&pageSize=15)
* [Vert.x User Group](https://groups.google.com/forum/?fromgroups#!forum/vertx)
* [Vert.x Gitter](https://gitter.im/eclipse-vertx/vertx-users)


