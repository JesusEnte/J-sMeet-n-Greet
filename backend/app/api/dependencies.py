from typing import Annotated
from sqlalchemy.orm import Session
from collections.abc import Generator
from fastapi import Depends

from core.db import engine

def get_db() -> Generator[Session]:
    with Session(engine) as session:
        yield session

DbDep = Annotated[Session, Depends(get_db)]