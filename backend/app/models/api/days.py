from pydantic import BaseModel, Field
from typing import Optional
from typing_extensions import Annotated
import datetime
import annotated_types

class Base(BaseModel):
    hours: Annotated[bytes, annotated_types.Len(3, 3)] = Field(description="binary representation of a day's 24 hours, 1 = available, 0 = busy, formatted as hex values")

class Update(BaseModel):
    hours: Optional[Annotated[bytes, annotated_types.Len(3, 3)]] = Field(description="binary representation of a day's 24 hours, 1 = available, 0 = busy, formatted as hex values")

    model_config = {
        "val_json_bytes": "hex",
        "json_schema_extra": {
            "examples": [{
                "hours": "03fff0"
            }]
        }
    }

class Response(Base):
    date: datetime.date

    model_config = {
        "ser_json_bytes": "hex",
        "json_schema_extra": {
            "examples": [{
                "hours": "0fff80",
                "date": "2026-08-31"
            }]
        }
    }