from fastapi import APIRouter, HTTPException

from datetime import date as Date
from ..dependencies import DbDep
from util.id_generators import create_random_id
from models.db import Days, Users, Sessions
from models.api.days import Response, Update
from sqlalchemy import select, and_

router = APIRouter(
    prefix='/{session_id}/{user_id}/days',
    tags=['days']
)

@router.get('/{date}', response_model=Response)
async def get(session_id: str, user_id: int | str, date: Date, db: DbDep):
    if user_id == 'all':
        hours_db = db.scalars(select(Days.hours)
            .select_from(Users)
            .join(Days, Days.user_id == Users.id, isouter=True)
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

        session_db = db.get(Sessions, session_id)
        session_db.update_last_access()
        db.commit()

        return Response (
            date = date,
            hours = hours
        )

    else:
        user_db = db.get(Users, user_id)
        if user_db is None:
            raise HTTPException(404, 'User not found')
        if user_db.session.id != session_id:
            raise HTTPException(403, 'User isnt part of the given session')

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

@router.put('/{date}', response_model=Response)
async def update(session_id: str, user_id: int, date: Date, day_update: Update, db: DbDep):
    user_db = db.get(Users, user_id)
    if user_db is None:
        raise HTTPException(404, 'User not found')
    if user_db.session.id != session_id:
        raise HTTPException(403, 'User isnt part of the given session')

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
        id = create_random_id()
        while db.get(Days, id) is not None:
            id = create_random_id()

        day_db = Days(
            id = id,
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