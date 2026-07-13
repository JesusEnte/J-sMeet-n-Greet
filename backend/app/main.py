from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import api.router

app = FastAPI(
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