from sqlalchemy.orm import Session
from ..models.index import Author, User, Book
from ..schemas.author_schemas import AuthorCreate, AuthorUpdate
from ..schemas.book_schemas import BookCreate


def get_author(db: Session, author_id: int):
    return db.query(Author).filter(Author.id == author_id).first()


def get_user_by_name(db: Session, user_name: str):
    return db.query(User).filter(User.name == user_name).first()


def get_authors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Author).offset(skip).limit(limit).all()


def create_author(db: Session, author: AuthorCreate):
    db_author = Author(name=author.name)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


def update_author(db: Session,  author_id: int, author: AuthorUpdate):
    db_author = db.query(Author).filter(Author.id == author_id).first()
    if db_author:
        for attr, value in vars(author).items():
            if value is not None:
                setattr(db_author, attr, value)
        db.commit()
        db.refresh(db_author)
    return db_author
