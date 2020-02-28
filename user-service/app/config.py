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
