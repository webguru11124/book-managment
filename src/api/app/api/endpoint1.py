from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from ..crud.author_crud import get_author,  get_authors
from ..models.index import Author as AuthorModel
from ..schemas.author_schemas import Author, AuthorCreate
from ..db.session import SessionLocal  # Make sure to have this file in your project

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/authors/", response_model=List[Author])
def read_authors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    authors = get_authors(db, skip=skip, limit=limit)
    return authors

@router.get("/authors/{author_id}", response_model=Author)
def author(author_id: int, db: Session = Depends(get_db)):
    author = author(db, author_id=author_id)
    if author is None:
        raise HTTPException(status_code=404, detail="author not found")
    return author

@router.post("/authors/", response_model=Author)
def author(author: AuthorCreate, db: Session = Depends(get_db)):
    author = author(db=db, author=author)
    return author
