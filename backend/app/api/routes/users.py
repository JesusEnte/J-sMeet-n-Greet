from fastapi import APIRouter
import uuid

from api.dependencies import DbDep
from models.db import Users
from models.api.users import Create, Update, Response
from util.validate import validate_session_id, validate_user_id

router = APIRouter(
    prefix='/{session_id}/users',
    tags=['users']
)

@router.get('/', response_model=list[Response])
async def get_list(session_id: str, db: DbDep):
    session_db = validate_session_id(db, session_id)
    
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
    validate_session_id(db, session_id)

    user_db = Users(
        name = user_create.name,
        session_id = session_id
    )
    db.add(user_db)
    db.flush()
    user_db.session.update_last_access()
    db.commit()

    user_response = Response(
        name=user_db.name,
        id=user_db.id
    )
    return user_response
    

@router.put('/{user_id}', response_model=Response)
async def update(session_id: str, user_id: uuid.UUID, user_update: Update, db: DbDep):
    user_db = validate_user_id(db, user_id, session_id)
    
    user_db.name = user_update.name
    user_db.session.update_last_access()
    db.commit()

    user_response = Response(
        name = user_db.name,
        id = user_db.id
    )
    return user_response

@router.delete('/{user_id}', response_model=str)
async def delete(session_id: str, user_id: uuid.UUID, db: DbDep):
    user_db = validate_user_id(db, user_id, session_id)
    
    user_db.session.update_last_access()
    db.flush()
    db.delete(user_db)
    db.commit()
    
    return f'Success: User {user_id} deleted'