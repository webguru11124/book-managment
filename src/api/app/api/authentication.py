from passlib.context import CryptContext
from fastapi import APIRouter, Depends, HTTPException
from ..models.index import User
from sqlalchemy.orm import Session
from ..crud.author_crud import get_author, create_author, get_authors,get_user_by_name
from typing import Optional
from ..db.session import SessionLocal  # Make sure to have this file in your project


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username: str, db: Session = SessionLocal()) -> Optional[User]:
    db_author = get_user_by_name(db, user_name=username)
    if db_author is None:
        raise HTTPException(status_code=404, detail="user not found")
    return db_author

def authenticate_author(authorname: str, password: str) -> Optional[User]:
    author = get_user(authorname)
    if author and verify_password(password, author.password):
        return author
