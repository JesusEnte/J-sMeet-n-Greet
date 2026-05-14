from fastapi import APIRouter

router = APIRouter(
    prefix='/sessions'
)

@router.post('')
@router.put('')
async def test():
    return 'test'