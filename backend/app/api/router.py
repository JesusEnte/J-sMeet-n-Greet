from fastapi import APIRouter

from .routes import days, sessions, users

router = APIRouter(
    tags=['api']
)

router.include_router(sessions.router)
router.include_router(users.router)
router.include_router(days.router)