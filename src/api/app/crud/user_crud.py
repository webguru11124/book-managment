from sqlalchemy.orm import Session
from ..models.index import User
from db.session import SessionLocal 

def create_user(name: str, password: str):
    # Create a session
    session = SessionLocal()

    try:
        # Create a new User object
        new_user = User(name=name, password=password)

        # Add the new user to the session
        session.add(new_user)

        # Commit the changes
        session.commit()
    except:
        # Rollback the changes in case of an error
        session.rollback()
        raise
    finally:
        # Close the session
        session.close()

def delete_all_rows():
    # Create a session
    session = SessionLocal()

    try:
        # Get the table's model class
        table_model = session.metadata.tables["users"]
        
        # Delete all rows from the table
        session.execute(table_model.delete())

        # Commit the changes
        session.commit()
    except:
        # Rollback the changes in case of an error
        session.rollback()
        raise
    finally:
        # Close the session
        session.close()