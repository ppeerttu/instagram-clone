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
