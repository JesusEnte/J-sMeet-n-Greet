from sqlalchemy import URL, create_engine, Engine

from .config import settings

url = URL.create(
    drivername='postgresql+psycopg2',
    username=settings['POSTGRES_USER'],
    password=settings['POSTGRES_PASSWORD'],
    database=settings['POSTGRES_DB'],
    host='localhost' if settings['DEV_MODE'] else 'db',
    port=5432
)

engine: Engine = create_engine(url)