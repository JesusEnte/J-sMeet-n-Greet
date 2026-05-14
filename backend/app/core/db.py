from sqlalchemy import URL, create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.engine import Engine

from core.config import settings
import models #required for SQLModel.metadata.create_all

def connect() -> Engine:
    """
    Tries to connect to the postgresql database
    Raises ConnectionError if database is offline
    """
    url = URL.create(
        drivername='postgresql+psycopg2',
        username=settings['POSTGRES_USER'],
        password=settings['POSTGRES_PASSWORD'],
        database=settings['POSTGRES_DB'],
        host='localhost' if settings['DEV_MODE'] else 'db',
        port=5432
    )
    engine = create_engine(url)
    try:
        # test wheter database in online
        with engine.connect() as _:
            pass
    except OperationalError:
        raise ConnectionError('Couldn\'t connect to database')
    return engine