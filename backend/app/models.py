from typing import List
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class Sessions(Base):
    __tablename__ = 'sessions_table'
    id: Mapped[str] = mapped_column(primary_key=True, default=None)

    name: Mapped[str] = mapped_column()

    users: Mapped[List['Users']] = relationship(back_populates='session')
    free_timespans: Mapped[List['Free_timespans']] = relationship(back_populates='session')


class Users(Base):
    __tablename__ = 'users_table'
    id: Mapped[int] = mapped_column(primary_key=True, default=None)

    name: Mapped[str] = mapped_column()

    session_id: Mapped[str] = mapped_column(ForeignKey('sessions_table.id'))
    session: Mapped['Sessions'] = relationship(back_populates='users')
    free_timespans: Mapped[List['Free_timespans']] = relationship(back_populates='user')


class Free_timespans(Base):
    __tablename__ = 'free_timespans_table'
    id: Mapped[int] = mapped_column(primary_key=True, default=None)

    start: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    end: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    user_id: Mapped[int] = mapped_column(ForeignKey('users_table.id'))
    user: Mapped['Users'] = relationship(back_populates='free_timespans')
    session_id: Mapped[str] = mapped_column(ForeignKey('sessions_table.id'))
    session: Mapped['Sessions'] = relationship(back_populates='free_timespans')