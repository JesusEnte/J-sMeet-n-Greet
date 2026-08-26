from pydantic import BaseModel
from typing import Optional

class Base(BaseModel):
    name: str

class Create(Base):
    pass

class Update(BaseModel):
    name: Optional[str]

class Response(Base):
    id: int