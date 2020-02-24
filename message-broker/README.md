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

### Listening to topics

In order to debug your application, you can publish events and listen to topics interactively from your host machine by using console scripts provided by [Kafka package][kafka-download]. You'll have to download and extract it to somewhere.

Here are some examples, where Kafka has been set up with [docker-compose.yml](docker-compose.yml) -file, and all commands are run within the downloaded Kafka package directory:

**Publish events to topic**

```bash
# Publish events to topic called "test"
$ sh bin/kafka-console-producer.sh --broker-list localhost:29092 --topic test
>Example event message
>Another event message
>{"property":"json message example"} 
```


**Consume events from topic**

```bash
# Consume all events (even previously published) from topic called "test"
$ sh bin/kafka-console-consumer.sh --bootstrap-server localhost:29092 --topic test --from-beginning
Example event message
Another event message
{"property":"json message example"} 
```


See [quickstart guide][kafka-quickstart] for more examples.


[kafka-site]:https://kafka.apache.org/
[zookeeper-site]:https://zookeeper.apache.org/
[kafka-download]:https://www.apache.org/dyn/closer.cgi?path=/kafka/2.4.0/kafka_2.12-2.4.0.tgz
[kafka-quickstart]:https://kafka.apache.org/quickstart
