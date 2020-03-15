#!/bin/sh

# Create named network
docker network create ig-clone-net

# Create named volumes for services
docker volume create auth-data
docker volume create comment-data
docker volume create image-data
docker volume create user-data
docker volume create zookeeper-data
docker volume create kafka-data
docker volume create consul-data
docker volume create redis-data

# Run the services
docker-compose up
