import settings
from mysql import connector
from mysql.connector import errorcode

try:
    print('Attempting Connection...')
    cnx = connector.connect(user=settings.USER, host=settings.HOST, password=settings.PW, database='football')
except connector.Error as err:
    print('Error!!')
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
else:
    print('Connection Succeeded!')
