from flask import Blueprint
from ..controllers.jugadores_controllers import JugadorController

jugador_bp =Blueprint('jugador_bp',__name__)

# Crear un nuevo usuario
jugador_bp.route('/', methods=['POST'])(JugadorController.crear_jugador)





