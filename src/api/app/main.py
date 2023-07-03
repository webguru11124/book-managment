from .db.session import SessionLocal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Update these based on your actual endpoints
from .api import endpoint1, endpoint2, endpoint3
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    app.state.db = SessionLocal()


@app.on_event("shutdown")
async def shutdown():
    app.state.db.close()

app.include_router(endpoint1.router, prefix="/api")
app.include_router(endpoint2.router, prefix="/api")
app.include_router(endpoint3.router, prefix="/api")
