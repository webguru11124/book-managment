from pydantic import BaseModel

class BookBase(BaseModel):
    name: str
    pages: int

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
