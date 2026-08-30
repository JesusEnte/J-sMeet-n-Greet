from pydantic import BaseModel
from typing import Optional
from typing_extensions import Annotated
from datetime import date as Date
import annotated_types

class Base(BaseModel):
    hours: bytes

class Update(BaseModel):
    hours: Optional[Annotated[bytes, annotated_types.Len(3, 3)]]

    model_config = {"val_json_bytes": "hex"}

class Response(Base):
    date: Date

    model_config = {"ser_json_bytes": "hex"}