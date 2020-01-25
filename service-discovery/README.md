# service-discovery

The service discovery mechanism can be used to publish scalable services dynamically for consumers. This particular system uses [Consul][consul-site] for service discovery. Every gRPC service will publish themselves, as well as the public REST API. Every service can watch for other services in order to find healthy instances to be consumed.

## Getting started

The `docker-compose.yml` file contains everything you need for local development. Please note the dependency of external network called `ig-clone-dev` and volume `consul-data-dev`.

1. Create network (if you haven't already): `docker network create ig-clone-dev`
2. Create volume: `consul-data-dev`
3. Launch the container: `docker-compose up`
   * Use `-d` flag if you want to run it in the background
   * `docker-compose down` will bring the Consul down if `Ctrl + C` doesn't do it
4. Visit [http://localhost:8500](http://localhost:8500) to see the web UI

[consul-site]:https://www.consul.io/
