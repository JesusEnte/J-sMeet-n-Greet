from fastapi import APIRouter

from ..dependencies import DbDep
from util.id_generators import create_session_id
from models.db import Sessions
from models.api.sessions import Create, Update, Response

router = APIRouter(
    prefix='/sessions'
)

@router.post('', response_model=Response)
async def create(session_create: Create, db: DbDep):
    id = create_session_id()
    while db.get(Sessions, id) is not None:
        id = create_session_id()

    session_db = Sessions(
        name = session_create.name,
        id = id
    )
    session_db.update_last_access()
    db.add(session_db)
    db.commit()

    session_response = Response(
        name = session_db.name,
        id = session_db.id
    )
    return session_response


@router.put('/{session_id}', response_model=Response)
async def update(session_id: str, session_update: Update, db: DbDep):
    session_db = db.get(Sessions, session_id)
    session_db.name = session_update.name
    db.add(session_db)
    db.commit()

    session_response = Response(
        name = session_db.name,
        id = session_db.id
    )
    return session_response