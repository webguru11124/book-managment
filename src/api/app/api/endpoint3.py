from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseSettings
from ..models.index import Author
from ..schemas.user_schemas import UserCredentials
from .authentication import authenticate_author
from typing import Optional

app = FastAPI()

router = APIRouter()


class Settings(BaseSettings):
    authjwt_secret_key: str = "secret"


@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@router.post("/login")
def login(user_credentials: UserCredentials, Authorize: AuthJWT = Depends()):
    user = authenticate_author(
        user_credentials.username, user_credentials.password)
    if user:
        access_token = Authorize.create_access_token(
            subject=user.name,
        )
        return {"access_token": access_token}
    else:
        raise HTTPException(
            status_code=401, detail="Invalid username or password")


# protect endpoint with function jwt_required(), which requires
# a valid access token in the request headers to access.
@router.get('/user')
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}
