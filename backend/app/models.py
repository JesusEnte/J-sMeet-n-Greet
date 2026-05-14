from sqlmodel import SQLModel, Field, TIMESTAMP


class Sessions(SQLModel):
    __tablename__ = 'sessions_table'
    id: str | None = Field(default=None, primary_key=True)
    name: str


class Users(SQLModel):
    __tablename__ = 'users_table'
    id: int = Field(default=None, primary_key=True)
    session_id: str = Field(default=None, foreign_key=True)
    name: str


class Free_timepans:
    __tablename__ = 'free_timespans_table'
    id: int = Field(default=None, primary_key=True)
    user_id: int = Field(default=None, foreign_key=True)
    session_id: str = Field(default=None, foreign_key=True)
    begin: TIMESTAMP
    end: TIMESTAMP