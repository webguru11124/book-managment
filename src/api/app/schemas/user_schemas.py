from typing import List
from pydantic import BaseModel
from .book_schemas import Book

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    books: List[Book] = []

    class Config:
        orm_mode = True
