from flask import Flask, jsonify, request
from config import Config
from flask_cors import CORS
from .database import DatabaseConnection

from .routes.jugador_bp import jugador_bp

from .controllers.jugadores_controllers import JugadorController

def init_app():
    app = Flask(__name__, static_folder=Config.STATIC_FOLDER, template_folder=Config.TEMPLATE_FOLDER)
    app.config.from_object(Config)
    DatabaseConnection.set_config(app.config)

    CORS(app)
    
    @app.route('/app/jugadores', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def api_jugadores():
        if request.method == 'POST':
            data = request.json 
            return JugadorController.crear_jugador(data)
        elif request.method =='PUT':
            return JugadorController.modificar_jugador (request.json)
        
    @app.route('/app/jugadores/validate', methods=['POST', 'PUT'])
    def api_jugadores_validate():
        if request.method == 'POST':
            return JugadorController.login_jugador(request.json)
        elif request.method =='PUT':
            return JugadorController.contrasena_update