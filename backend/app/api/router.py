from fastapi import APIRouter

from .routes import sessions, users, free_timespans

router = APIRouter(
    tags=['api']
)

router.include_router(sessions.router)
router.include_router(users.router)
router.include_router(free_timespans.router)