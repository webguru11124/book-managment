
# scripts

## postgresql

### make migration

src/api/    
    alembic revision --autogenerate -m "initial migration"

### run migration

src/api/
    alembic upgrade head

### do seed data

src/api/
    python seeder.py

### using pgadmin4 for browser database

sudo /usr/pgadmin4/bin/setup-web.sh
sudo systemctl start pgadmin4

on browser, http://localhost/pgadmin4

```

CREATE TABLE "users" ( id SERIAL PRIMARY KEY,  name VARCHAR(100), books  INTEGER[] );
CREATE TABLE "books" ( id SERIAL PRIMARY KEY,  name VARCHAR(100), owner_id VARCHAR(100), page_size  INTEGER );


```

## run backend

src/api
    uvicorn app.main:app --port 8100 --reload

## run frontend

src/dashboard
    num run dev

# login credentials
name: jack
password: 123456

