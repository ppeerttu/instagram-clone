# rest-api

Public REST API for the Instagram clone project. This API is built on top of [Koa][koa-site] and uses the other services through gRPC in order to serve HTTP clients.

## Requirements

* Node.js (version 10 or up)
* Docker

## Getting started

In order to quickly get your hands dirty, follow these steps:

1. Install dependencies: `npm install`
2. Create a network for local development: `docker network create ig-clone-dev`
3. Run the server by using `docker-compose up`
   * In case you don't have Docker, you can run it directly on host by issuing `npm start`
     * Please note that some environment variables has to be populated
   * In order to connect to `auth-service`, launch that first
4. The server should be up and running either in port `4000` or some other in case your not using Docker


[koa-site]:https://koajs.com/

