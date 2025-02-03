from flask import request, jsonify
from ..models.jugadores_models import Jugador

class JugadorController:
    @classmethod
    def crear_jugador(cls, data):
        # Crea instancia de Jugador con los datos proporcionados
        jugador = Jugador(
            usuario=data.get('usuario'),
            nombre=data.get('nombre'), 
            edad=data.get('edad'),
            apodo=data.get('apodo'),
            nivel_habilidad=data.get('nivel_habilidad'),
            contrasena=data.get('contrasena'),
            usuario=data.get('usuario'),
            correo=data.get('correo')
        )

        # Guarda el jugador en la base de datos 
        Jugador.crear_jugador(jugador)

        # . Retorna la información del jugador creado
        jugador_dict = jugador.to_dict()
        
        return {'message': jugador_dict}, 200
    
    @classmethod
    def modificar_jugador(cls,data):
        jugador = Jugador (
            id=data.get('id'),
            usuario=data.get('usuario'),
            nombre=data.get('nombre'),  
            apellido=data.get('apellido'),
            edad=data.get('edad'),
            apodo=data.get('apodo'),
            nivel_habilidad=data.get('nivel_habilidad'),
            contrasena=data.get('contrasena'),
            usuario=data.get('usuario'),
            correo=data.get('correo')   
        )

    @classmethod
    def logueo_jugador(cls,data):
        usuario = data.get ('usuario'),
        contrasena = data.get ('contrasena')
        
        if not usuario or not contrasena:
            return jsonify({"error": "Ingrese usuario y contraseña"}),400
        
        query = """SELECT * FROM jugadores WHERE usuario = %s AND contrasena = %s"""
        params = (usuario,contrasena)
        
        jugador = Jugador.autenticar_jugador(query,params)
        
        if jugador:
            return jsonify({"jugador": jugador.to_dict()}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
    