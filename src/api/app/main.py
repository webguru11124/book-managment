from fastapi import FastAPI
from .api import endpoint1, endpoint2  # Update these based on your actual endpoints
from .db.session import SessionLocal

app = FastAPI()

@app.on_event("startup")
async def startup():
    app.state.db = SessionLocal()

@app.on_event("shutdown")
async def shutdown():
    app.state.db.close()

app.include_router(endpoint1.router)
app.include_router(endpoint2.router)
