from sqlalchemy.orm import Session
from ..models.index import Book, Author
from ..schemas.book_schemas import BookCreate, BookUpdate


def get_books_by_author(db: Session, author_id: int):
    return db.query(Book).join(Author).filter(Author.id == author_id).all()


def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Book).offset(skip).limit(limit).all()


def create_author_book(db: Session, book: BookCreate, author_id: int):
    db_book = Book(**book.dict(), owner_id=author_id)
    print(db_book)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def get_book(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def update_book(db: Session,  book_id: int, book: BookUpdate):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        for attr, value in vars(book).items():
            if value is not None:
                setattr(db_book, attr, value)
        db.commit()
        db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: int):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
        return True
    return False
