from fastapi import APIRouter

router = APIRouter(
    prefix='/{session_id}/users'
)

@router.get('')
@router.post('')
@router.put('')
@router.delete('')
async def test(session_id):
    return f'{session_id}'
