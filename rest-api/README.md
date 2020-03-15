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

## Environment variables

When running with `docker-compose`, injecting environment variables is rather simple. The variables are always defined in the `docker-compose.yml` file. Some variables may be injecetd from `.env` files. In case you are running the service without Docker, you have to define the variables in some other manner.

| Name                | Example value | Default  | Description                 |
|---------------------|---------------|--------------|-----------------------------|
| `NODE_ENV`          | `production`    |  `development`         | Current running environment |
| `SERVER_PORT`       | `3000`            | `3000`         | Port the application server will listen to |
| `CONSUL_HOST`       | `consul-dev`     |           | Hostname of the Consul instance |
| `CONSUL_CLIENT_NAME`| `rest-api`     | `rest-api`          | Name of this service when registering to Consul |
| `AUTH_SERVICE`      | `auth-service` |             | Name of the authentication service in Consul (not a name of a single instance) |
| `IMAGE_SERVICE`     | `image-service`     |        | Name of the image service in Consul |
| `COMMENT_SERVICE`   | `comment-service`   |        | Name of the comment service in Consul |
| `USER_SERVICE`      | `user-service`      |        | Name of the users ervice in Consul |
| `USE_STATIC_ENDPOINTS`  | `tue`  | `false`        | Whether to discard Consul and use service names as they are (see more info below) |

### Using static endpoints

The system architecture is based on service discovery mechanism provided by Consul. However, some container orchestration solutions, such as Kubernetes, provides service discovery mechanisms on their own. For example Kubernetes allows hiding containers behind **services**, for which the domain name is well-known. It handles load balancing as well. Thus, we can find services within our cluster rather easily by using common naming scheme: `<service-name>.<namespace>.svc.<cluster-name>`, which could be for example `image-service.default.svc.cluster.local`.

In case you want to run the system e.g. in Kubernetes, you don't need to deploy Consul into the cluster. Instead, set the `USE_STATIC_ENDPOINTS` flag to `true`, and set service names according to the Kubernetes service naming scheme; e.g. `AUTH_SERVICE=auth-service.default.svc.cluster.local`.


[koa-site]:https://koajs.com/

