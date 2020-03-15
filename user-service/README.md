# user-service

User servicde for the instagram clone project.

## Technologies

* [Python 3][python-site]
* [PosgreSQL][psql-site]
  * [SQLAlchemy][sqla-site] as ORM
  * [dbmate][dbmate-site] for migration management
* [gRPC][grpc-site] for exposing APIs
* [Docker][docker-site]


## Getting started

In order to run the user-service locally e.g. for development purposes:

1. Fill environment variable files by using `example*env` -files
   1. Create `.env` out of [example.env](example.env) -file and fill proper values
   2. Create `.db.env` out of [example.db.env](example.db.env) -file and fill proper values
   3. Please note that `dbmate` uses `.env` file, whereas Python app uses variables from `.db.env`; credentials in those files should usually match
2. Create a network if you haven't already: `docker network create ig-clone-dev`
3. Create a database volume for user database: `docker volume create user-data-dev`
4. Run the application with docker-compose: `docker-compose up`
   * During the first run, the database is usually not ready when the `dbmate` (migration container) is trying to run migrations, which results in errors. If that happens, bring the containers down and then up again.

**NOTE**: Local development can be done without running the `user-service` container. E.g. you can run the database within Docker container, but run the Python app on host machine. To do so, launch only the database containers:

```bash
# Run with attached mode
docker-compose up user-db user-migrations

# OR run in detached mode
docker-compose up -d user-db user-migrations
```

## Database migrations

The database schema is managed by using [dbmate][dbmate-site]. The [docker-compose.yml](docker-compose.yml) file contains one container for `dbmate`; you can use that by changing the `command` argument for it. You can also install it locally on your host machine, but be aware that then you might have to change configuration (`.env` -file).

The migration files can be found from [db/migrations](db/migrations) directory.

Useful `dbmate` commands:

* `migrate` - Runs any pending migrations (currently default command in docker-compose.yml -file)
* `rollback` - Roll back the last migration
* `new` - Generate a new migration file into [db/migrations](db/migrations) directory

## Configuration

The application can be configured with environment variables and `*.env` files. In case the `POSTGRES_USER` environment variable has not been set, the application tries to load environment variables from `.db.env` -file. See [config.py](./app/config.py) for the implementation details.


| Name                | Example value | Default | Description                 |
|---------------------|----------------|-------------|-----------------------------|
| POSTGRES_HOST                 | `127.0.0.1`, `auth-db-dev` | `localhost` | PostgreSQL host  | PostgreSQL database hostname |
| POSTGRES_PORT | `5432` | `5432` | PostgreSQL database port number |
| POSTGRES_DB | `mydatabase` |        | PostgreSQL database name |
| POSTGRES_USER | `myuser` |          | PostgreSQL database username |
| POSTGRES_PASSWORD | `mypassword123` |         | PostgreSQL database password |
| CONSUL_HOST  | `consul`  | `localhost`  | Consul hostname or IP addres |
| CONSUL_PORT  | `8500` | `8500` | Consul port number |
| CONSUL_CLIENT_NAME | `user-service` | `user-service` | Consul client name for this service |
| CONSUL_ENABLED | `false`  | `true` | Whether to publish this service to Consul |
| GRPC_PORT | `3000`| `3000` | The port to bind to the gRPC server |
| APP_ENV | `production` | `development` | Application running environment |
| KAFKA_ACCOUNS_TOPIC | `accounts` |  `accounts` | Kafka topic for account events (consume) |
| KAFKA_USERS_TOPIC | `users` | `users` | Kafka topic for user events (publish) |
| KAFKA_SERVERS |  `kafka:9092` | `localhost:29092` | Kafka server + port combo |
| KAFKA_CONSUMER_GROUP | `user-service` | `user-service` | Kafka consumer group for this service |
| HTTP_PORT | `8080` | `8080` | Port to which bind the health check server |

[python-site]:https://www.python.org/
[psql-site]:https://www.postgresql.org/
[grpc-site]:https://grpc.io/
[docker-site]:https://www.docker.com/
[sqla-site]:https://www.sqlalchemy.org/
[dbmate-site]:https://github.com/amacneil/dbmate
