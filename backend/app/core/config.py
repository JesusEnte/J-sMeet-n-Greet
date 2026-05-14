import os
from dotenv import load_dotenv

load_dotenv()

settings = {
    'POSTGRES_USER': os.getenv('POSTGRES_USER', 'postgres'),
    'POSTGRES_DB': os.getenv('POSTGRES_DB', 'postgres'),
    'POSTGRES_PASSWORD': os.getenv('POSTGRES_PASSWORD', None)
}