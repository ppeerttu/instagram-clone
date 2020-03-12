import os
from pathlib import Path
from dotenv import load_dotenv

DB_ENV_FILE_NAME = '.db.env'

if os.getenv("POSTGRES_USER") is None:
    env_file = Path(__file__).parent / '..' / DB_ENV_FILE_NAME    
    load_dotenv(dotenv_path=env_file)


database_config = {
    'username': os.getenv("POSTGRES_USER"),
    'password': os.getenv("POSTGRES_PASSWORD"),
    'host': os.getenv("POSTGRES_HOST", "localhost"),
    'port': os.getenv("POSTGRES_PORT", 5432),
    'database': os.getenv("POSTGRES_DB")
}

consul_config = {
    'host': os.getenv("CONSUL_HOST", "localhost"),
    'port': os.getenv("CONSUL_PORT", 8500),
    'client_name': os.getenv("CONSUL_CLIENT_NAME", "user-service"),
    'enabled': os.getenv("CONSUL_ENABLED", "true") == "true"
}

grpc_config = {
    'port': os.getenv("GRPC_PORT", 3000),
    'app_env': os.getenv("APP_ENV", "development")
}

kafka_consumer_config = {
    'topic': os.getenv("KAFKA_ACCOUNTS_TOPIC", "accounts"),
    'bootstrap_servers': os.getenv("KAFKA_SERVERS", "localhost:29092"),
    'group_id': os.getenv("KAFKA_CONSUMER_GROUP", "user-service")
}

kafka_producer_config = {
    'bootstrap_servers': os.getenv("KAFKA_SERVERS", "localhost:29092"),
    'topic': os.getenv("KAFKA_USERS_TOPIC", "users")
}

server_config = {
    'port': os.getenv("HTTP_PORT", 8080)
}
