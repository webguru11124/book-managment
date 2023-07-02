from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..core import config  # Import your actual config

# Assuming SQLALCHEMY_DATABASE_URL is your database URL in config
SQLALCHEMY_DATABASE_URL = config.SQLALCHEMY_DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
