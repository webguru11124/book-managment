from sqlalchemy.orm import Session
from ..models.book import Book
from ..schemas.book_schemas import BookCreate

def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Book).offset(skip).limit(limit).all()

def create_user_book(db: Session, book: BookCreate, user_id: int):
    db_book = Book(**book.dict(), owner_id=user_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book
