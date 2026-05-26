from fastapi import APIRouter, HTTPException

from ..dependencies import DbDep
from util.id_generators import create_random_id
from models.db import Sessions, Users
from models.api.users import Create, Update, Response

router = APIRouter(
    prefix='/{session_id}/users'
)

@router.get('/', response_model=list[Response])
async def get_list(session_id: str, db: DbDep):
    session_db = db.get(Sessions, session_id)
    if session_db is None:
        raise HTTPException(404, 'User not found')
    
    users_response = []
    for u in session_db.users:
        users_response.append(Response(
            name = u.name,
            id = u.id
        ))

    session_db.update_last_access()
    db.commit()

    return users_response

@router.post('/', response_model=Response)
async def create(session_id: str, user_create: Create, db: DbDep):
    session_db = db.get(Sessions, session_id)
    if session_db is None:
        raise HTTPException(404, 'Session not found')
    
    id = create_random_id()
    while db.get(Users, id) is not None:
        id = create_random_id()

    user_db = Users(
        name = user_create.name,
        id = id,
        session_id = session_id
    )
    db.add(user_db)
    db.commit()
    user_db.session.update_last_access()
    db.commit()

    user_response = Response(
        name=user_db.name,
        id=user_db.id
    )
    return user_response
    

@router.put('/{user_id}', response_model=Response)
async def update(session_id: str, user_id: int, user_update: Update, db: DbDep):
    user_db = db.get(Users, user_id)
    if user_db is None:
        raise HTTPException(404, 'User not found')
    if user_db.session.id != session_id:
        raise HTTPException(403, 'User isnt part of the given session')
    
    user_db.name = user_update.name
    user_db.session.update_last_access()
    db.commit()

    user_response = Response(
        name = user_db.name,
        id = user_db.id
    )
    return user_response

@router.delete('/{user_id}', response_model=str)
async def delete(session_id: str, user_id: int, db: DbDep):
    user_db = db.get(Users, user_id)
    if user_db.session.id != session_id:
        raise HTTPException(403, 'User isnt part of the given session')
    if user_db is None:
        return f'Fail: User {user_id} not found'
    
    user_db.session.update_last_access()
    db.delete(user_db)
    db.commit()
    
    return f'Success: User {user_id} deleted'