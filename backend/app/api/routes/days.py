from fastapi import APIRouter

router = APIRouter(
    prefix='/{session_id}/{user_id}/days',
    tags=['days']
)

