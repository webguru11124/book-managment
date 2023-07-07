from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from ..crud.book_crud import get_books, create_author_book, update_book, get_books_by_author, delete_book
from ..models.index import Book as BookModel
from ..schemas.book_schemas import Book, BookCreate, BookUpdate
# Make sure to have this file in your project
from ..db.session import SessionLocal

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
    print(books)
    return books


@router.get("/users/{author_id}/books/", response_model=List[Book])
def read_books_by_author(author_id: int, db: Session = Depends(get_db)):
    books = get_books_by_author(db, author_id)
    return books


@router.post("/users/{author_id}/books/", response_model=Book)
def create_book_for_user(author_id: int, book: BookCreate, db: Session = Depends(get_db)):
    return create_author_book(db=db, book=book, author_id=author_id)


@router.get("/books/{book_id}", response_model=Book)
def book(book_id: int, db: Session = Depends(get_db)):
    book = Book(db, book_id=book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="book not found")
    return book


@router.delete("/books/{book_id}")
def book(book_id: int, db: Session = Depends(get_db)):
    result = delete_book(db, book_id)
    if result is False:
        raise HTTPException(status_code=400, detail="book delete failed")
    return {"message": "Book deleted successfully"}


@router.put("/books/{book_id}", response_model=Book)
def book(book_update: BookUpdate, book_id: int, db: Session = Depends(get_db)):
    book = update_book(db=db, book_id=book_id, book=book_update)
    return book
