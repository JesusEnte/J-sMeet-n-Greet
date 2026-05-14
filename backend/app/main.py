from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import core.config
import core.db
import api.router

@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = core.db.connect()
    yield

app = FastAPI(
    lifespan=lifespan,
    title='J\'sMeet\'n\'Greet API',
    docs_url='/api/docs'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(api.router.router)