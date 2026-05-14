from fastapi import APIRouter

router = APIRouter(
    prefix='/{session_id}/{user_id}/free_timespans'
)

@router.get('')
@router.post('')
async def test(session_id, user_id):
    return f'{session_id} {user_id}'