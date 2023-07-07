from typing import List
from pydantic import BaseModel
from .book_schemas import Book


class AuthorBase(BaseModel):
    name: str
    books: List[Book] = []


class AuthorCreate(AuthorBase):
    pass


class Author(AuthorBase):
    id: int

    class Config:
        orm_mode = True


class AuthorUpdate(Author):
    name: str
