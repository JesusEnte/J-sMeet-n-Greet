from pydantic import BaseModel

class Base(BaseModel):
    name: str

class Create(Base):
    pass

class Update(Base):
    pass

class Response(Base):
    id: int