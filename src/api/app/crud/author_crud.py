from sqlalchemy.orm import Session
from ..models.index import Author
from ..models.index import User
from ..schemas.author_schemas import AuthorCreate

def get_author(db: Session, author_id: int):
    return db.query(Author).filter(Author.id == author_id).first()

def get_user_by_name(db: Session, user_name: str):
    return db.query(User).filter(User.name == user_name).first()

def get_authors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Author).offset(skip).limit(limit).all()

def create_author(db: Session, author: AuthorCreate):
    db_author = author(name=author.name)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author
