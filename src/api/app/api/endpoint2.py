from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from ..crud.book_crud import get_books, create_user_book
from ..models.book import Book as BookModel
from ..schemas.book_schemas import Book, BookCreate
from ..db.session import SessionLocal  # Make sure to have this file in your project

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/books/", response_model=List[Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    books = get_books(db, skip=skip, limit=limit)
    return books

@router.post("/users/{user_id}/books/", response_model=Book)
def create_book_for_user(user_id: int, book: BookCreate, db: Session = Depends(get_db)):
    return create_user_book(db=db, book=book, user_id=user_id)
