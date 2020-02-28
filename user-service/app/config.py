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
    'client_name': os.getenv("CONSUL_CLIENT_NAME", "user-service")
}

grpc_config = {
    'port': os.getenv("GRPC_PORT", 8080),
    'app_env': os.getenv("APP_ENV", "development")
}
