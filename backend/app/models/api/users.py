from pydantic import BaseModel
from typing import Optional
import uuid

class Base(BaseModel):
    name: str

class Create(Base):
    pass

class Update(BaseModel):
    name: Optional[str]

class Response(Base):
    id: uuid.UUID