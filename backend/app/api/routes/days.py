from fastapi import APIRouter

import datetime
import uuid
from api.dependencies import DbDep
from models.db import Days, Users
from models.api.days import Response, Update
from sqlalchemy import select, and_
from util.validate import validate_session_id, validate_user_id

router = APIRouter(
    prefix='/{session_id}',
    tags=['days']
)

@router.get('/all/days/{date}')
async def get_all(session_id: str, date: datetime.date, db: DbDep):
    session_db = validate_session_id(db, session_id)

    hours_db = db.scalars(select(Days.hours)
        .select_from(Users)
        .join(Days, 
            and_(
                (Users.id==Days.user_id),
                (Days.date==date)), 
            isouter=True
        )
        .where(Users.session_id == session_id)
    ).all()

    if len(hours_db) == 0:
        hours = b'\0\0\0'
    elif None in hours_db:
        hours = b'\0\0\0'
    else:
        hours = bytearray(b'\xff\xff\xff')
        for v in hours_db:
            for i in range(3):
                hours[i] = hours[i] & v[i]

    session_db.update_last_access()
    db.commit()

    return Response (
        date = date,
        hours = hours
    )

@router.get('/{user_id}/days/{date}', response_model=Response)
async def get(session_id: str, user_id: uuid.UUID, date: datetime.date, db: DbDep):
    user_db = validate_user_id(db, user_id, session_id)

    day_db = db.scalar(
        select(Days)
        .where(
            and_(Days.user_id == user_id, 
            Days.date == date
            )
        )
    )

    user_db.session.update_last_access()
    db.commit()
    
    return Response (
        date = date,
        hours = day_db.hours if day_db is not None else b'\0\0\0'
    )

@router.put('/{user_id}/days/{date}', response_model=Response)
async def update(session_id: str, user_id: uuid.UUID, date: datetime.date, day_update: Update, db: DbDep):
    user_db = validate_user_id(db, user_id, session_id)

    day_db = db.scalar(
        select(Days)
        .where(
            and_(
                Days.user_id == user_id, 
                Days.date == date
            )
        )
    )

    if day_db is None:
        day_db = Days(
            date = date,
            hours = bytes(3),
            user = user_db,
            session_id = session_id
        )
        db.add(day_db)
        db.flush()
        
    if day_update.hours is None:
        pass
    else:
        day_db.hours = day_update.hours

    if day_db.hours == b'\0\0\0':
        db.delete(day_db)


    user_db.session.update_last_access()
    db.commit()

    day_response = Response(
        date = date,
        hours = day_db.hours
    )

    return day_response