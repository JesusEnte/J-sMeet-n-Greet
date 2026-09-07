from fastapi import HTTPException
from models.db import Users, Sessions
from sqlalchemy.orm import Session
import uuid

def validate_session_id(db: Session, session_id: str) -> Sessions:
    session = db.get(Sessions, session_id)
    if session is None:
        raise HTTPException(404, 'session not found')
    return session

def validate_user_id(db: Session, user_id: uuid.UUID, session_id: str) -> Users:
    user = db.get(Users, user_id)
    if user is None:
        raise HTTPException(404, 'user not found')
    if user.session_id != session_id:
        raise HTTPException(403, 'invalid session for user')
    return user