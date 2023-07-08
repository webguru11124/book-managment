
![Alt Text](https://github.com/webguru11124/developer-full-stack-challenge/blob/main/full-stack.gif)


# login credentials
name: jack
password: 123456


# scripts

## postgresql


## run backend

src/api
    uvicorn app.main:app --port 8100 --reload

## run frontend

src/dashboard
    num run dev

## database - postgresql

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
basic migration but follow the above step to make migration.

-- Table: public.authors

-- DROP TABLE IF EXISTS public.authors;

CREATE TABLE IF NOT EXISTS public.authors
(
    id integer NOT NULL DEFAULT nextval('authors_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    CONSTRAINT authors_pkey PRIMARY KEY (id)
)

-- Table: public.books

-- DROP TABLE IF EXISTS public.books;

CREATE TABLE IF NOT EXISTS public.books
(
    id integer NOT NULL DEFAULT nextval('books_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    pages integer,
    owner_id integer,
    CONSTRAINT books_pkey PRIMARY KEY (id),
    CONSTRAINT books_owner_id_fkey FOREIGN KEY (owner_id)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)


```
