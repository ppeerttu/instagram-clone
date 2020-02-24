# message-broker

The Instagram clone project uses a message broker for distributing several events through components of the system. In this case, the chosen message broker is [kafka][kafka-site]. Kafka is widely used, battle tested, high performance distributed streaming platform, that can be utilized in various ways.

## Getting started

In order to setup the development environment, you can use the [docker-compose.yml](./docker-compose.yml) -file.

1. Create volumes for Kafka and [ZooKeeper][zookeeper-site]
   1. `docker volume create zookeeper-data-dev`
   2. `docker volume create kafka-data-dev`
   3. Run this if you don't have the common development network set up yet: `docker network create ig-clone-dev`
2. Launch the containers by running `docker-compose up`
   1. Use `-d` -flag for detached mode; `docker-compose down` will bring the containers down


[kafka-site]:https://kafka.apache.org/
[zookeeper-site]:https://zookeeper.apache.org/
