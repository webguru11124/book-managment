import psycopg2
from psycopg2 import Error
from passlib.context import CryptContext

try:
    connection = psycopg2.connect(
        user="postgres",
        password="123456",
        host="localhost",
        port="5432",
        database="postgres"
    )

    cursor = connection.cursor()


except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL:", error)

delete_query = "DELETE FROM users;"

try:
    cursor.execute(delete_query)
    connection.commit()
    print("All rows deleted")

except (Exception, Error) as error:
    print("Error while deleting data:", error)

insert_query = "INSERT INTO users (name, password) VALUES (%s, %s);"
name = "jack"
plain_password = "123456"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed_password = pwd_context.hash("123456")

data = (name, hashed_password)
try:
    cursor.execute(insert_query, data)
    connection.commit()
    print("Data inserted successfully")

except (Exception, Error) as error:
    print("Error while inserting data:", error)
if connection:
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")
