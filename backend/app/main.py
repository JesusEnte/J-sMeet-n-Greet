from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import api.router
import cron.cleanup


@asynccontextmanager
async def lifespan(app: FastAPI):
    cron.cleanup.main() #just run cleanup once on startup
    cron.cleanup.setup()
    yield

app = FastAPI(
    lifespan=lifespan,
    title='J\'sMeet\'n\'Greet API',
    docs_url='/docs'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(api.router.router)