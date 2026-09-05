from fastapi import APIRouter
from models.api.health import Response

router = APIRouter(
    prefix='/health',
    tags=['health check']
)

@router.get('', response_model=Response)
def health():
    return {'status': 'online'}