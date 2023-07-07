# postgresql

sudo /usr/pgadmin4/bin/setup-web.sh
sudo systemctl start pgadmin4

on browser, http://localhost/pgadmin4

# run backend

src/api
    uvicorn app.main:app --port 8100 --reload

# run frontend

src/dashboard
    num run dev

# make migration

src/api/    
    alembic revision --autogenerate -m "initial migration"

# run migration

src/api/
    alembic upgrade head

# do seed data

src/api/
    python seeder.py
