from typing import List
from sqlalchemy import ForeignKey, Date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from datetime import date

class Base(DeclarativeBase):
    pass

class Sessions(Base):
    __tablename__ = 'sessions_table'
    id: Mapped[str] = mapped_column(primary_key=True, default=None)

    name: Mapped[str] = mapped_column()
    last_access: Mapped[Date] = mapped_column(Date)

    users: Mapped[List['Users']] = relationship(back_populates='session', cascade='all, delete-orphan')
    days: Mapped[List['Days']] = relationship(back_populates='session', cascade='all, delete-orphan')

    def update_last_access(self):
        self.last_access = date.today()


class Users(Base):
    __tablename__ = 'users_table'
    id: Mapped[int] = mapped_column(primary_key=True, default=None, autoincrement=False)

    name: Mapped[str] = mapped_column()

    session_id: Mapped[str] = mapped_column(ForeignKey('sessions_table.id'), nullable=False)
    session: Mapped['Sessions'] = relationship(back_populates='users')
    days: Mapped[List['Days']] = relationship(back_populates='user', cascade='all, delete-orphan')


class Days(Base):
    __tablename__ = 'days_table'
    id: Mapped[int] = mapped_column(primary_key=True, default=None, autoincrement=False)

    date: Mapped[Date] = mapped_column(Date)
    hours: Mapped[bytes] = mapped_column()

    user_id: Mapped[int] = mapped_column(ForeignKey('users_table.id'), nullable=False)
    user: Mapped['Users'] = relationship(back_populates='days')
    session_id: Mapped[str] = mapped_column(ForeignKey('sessions_table.id'), nullable=False)
    session: Mapped['Sessions'] = relationship(back_populates='days')