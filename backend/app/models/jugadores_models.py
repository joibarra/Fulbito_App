from ..database import DatabaseConnection
from .exceptions import DatabaseError, UserNotFound
from flask import request

class Jugador:
    
    def __init__(self, id=None, nombre=None, apellido=None, edad=None, apodo=None, nivel_habilidad=None, contrasena=None, usuario=None, correo=None):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.edad = edad
        self.apodo = apodo
        self.nivel_habilidad = nivel_habilidad
        self.contrasena = contrasena
        self.usuario = usuario
        self.correo = correo
        
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'edad': self.edad,
            'apodo': self.apodo,
            'nivel_habilidad': self.nivel_habilidad,
            'contrasena': self.contrasena,
            'usuario' : self.usuario,
            'correo': self.correo
        }
    @classmethod
    def autenticar_jugador(cls, query, params):
        cursor = None
        user = None

        try:
            cursor = DatabaseConnection.get_connection().cursor()
            cursor.execute(query, params)
            results = cursor.fetchall()
            for result in results:
                print(result)
            if results:
                user_data = {
                    'id': result[0],
                    'nombre': result[1],
                    'apellido': result[2],
                    'edad': result[3],
                    'apodo': result[4],
                    'nivel_habilidad': result[5],
                    'contrasena': result[6],
                    'usuario': result [7],
                    'correo': result[8]
                }
                user = Jugador(**user_data)
        except Exception as e:
            print("Error en la autenticación:", str(e))    
        finally:
            if cursor:
                cursor.close()  
        return user 
       
    @classmethod
    def get_jugadores(cls):
        """Obtiene todos los jugadores."""
        query = "SELECT id, nombre, apellido, edad, apodo, nivel_habilidad, contrasena, usuario, correo FROM Jugadores"
        results = DatabaseConnection.fetch_all(query)

        jugadores = []
        for result in results:
            jugador = Jugador(*result)  # Desempaqueta los resultados para crear objetos Jugador
            jugadores.append(jugador)

        return jugadores

    @classmethod
    def crear_jugador(cls, jugador):
        """Crea un nuevo jugador."""
        query = """INSERT INTO Jugadores (nombre, apellido, edad, apodo, nivel_habilidad, contrasena, usuario, correo)
                   VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        params = (jugador.nombre, jugador.apellido, jugador.edad, jugador.apodo, 
                  jugador.nivel_habilidad, jugador.contrasena, jugador.usuario, jugador.correo) 
        cursor = DatabaseConnection.execute_query(query, params)
        
        return jugador
    
    @classmethod
    def actualizar_jugador(cls, jugador):
        """Actualiza la información de un jugador."""

        query = """UPDATE Jugadores SET nombre = %s, apellido = %s, edad = %s, apodo = %s, 
                   nivel_habilidad = %s, contrasena = %s, usuario = %s, correo = %s WHERE id = %s"""
        params = (jugador.nombre, jugador.apellido, jugador.edad, jugador.apodo,
                  jugador.nivel_habilidad, jugador.contrasena, jugador.usuario, jugador.correo, jugador.id)

        cursor = DatabaseConnection.execute_query(query, params)

        return jugador  # Retorna el objeto Jugador actualizado

    @classmethod
    def eliminar_jugador(cls, id_jugador):
        """Elimina un jugador por su ID."""
        query = "DELETE FROM Jugadores WHERE id = %s"
        params = (id_jugador,)
        cursor = DatabaseConnection.execute_query(query, params)

        return True  # Retorna True si la eliminación fue exitosa