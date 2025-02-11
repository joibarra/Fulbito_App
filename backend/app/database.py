import mysql.connector
from dotenv import dotenv_values

class DatabaseConnection: 
    _connection = None
    _config = dotenv_values(".env") 


    @classmethod
    def get_connection(cls):
        if cls._connection is None:
            cls._connection = mysql.connector.connect(
                host='localhost',          
                user='root',              
                password='',              
                port=3306,                
                database='futbol5app'   
            )
        return cls._connection
    
    @classmethod
    def set_config(cls, config):
        cls._config = config
        
    @classmethod
    def execute_query(cls, query,  params=None):
        cursor = cls.get_connection().cursor()
        cursor.execute(query,params)
        cls._connection.commit()
        return cursor
    
    @classmethod
    def fetch_one(cls,query, params=None):
        cursor = cls.get_connection().cursor()
        cursor.execute(query,params)
        return cursor.fetchone()
  
    @classmethod
    def fetch_all(cls,query, params=None):
        cursor = cls.get_connection().cursor()
        cursor.execute(query,params)
        return cursor.fetchall()
  
    @classmethod
    def close_connection(cls):
        if cls._connection is not None:
            cls._connection.close()
            cls._connection=None