import os
from dotenv import load_dotenv

load_dotenv()

settings = {
    'DEV_MODE': os.getenv('DEV_MODE', False) == 'True',
    'POSTGRES_USER': os.getenv('POSTGRES_USER', 'postgres'),
    'POSTGRES_DB': os.getenv('POSTGRES_DB', 'postgres'),
    'POSTGRES_PASSWORD': os.getenv('POSTGRES_PASSWORD', '')
}