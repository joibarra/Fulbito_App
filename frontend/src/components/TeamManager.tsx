import { useState } from 'react';

interface Player {
  name: string;
  lastName: string;
  age: string;
  nickname: string;
  skillLevel: string;
}

interface Team {
  name: string;
  players: Player[];
}

interface TeamManagerProps {
  players: Player[]; // ✅ Recibe jugadores dinámicos desde `App.tsx`
}

function TeamManager({ players }: TeamManagerProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handleCreateTeam = () => {
    if (teamName.trim() === '' || selectedPlayers.length === 0) {
      alert('Debes ingresar un nombre y seleccionar jugadores.');
      return;
    }

    const newTeam: Team = { name: teamName, players: selectedPlayers };
    setTeams([...teams, newTeam]);
    setTeamName('');
    setSelectedPlayers([]);
  };

  const togglePlayerSelection = (player: Player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else if (selectedPlayers.length < 5) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert('Un equipo no puede tener más de 5 jugadores.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Gestión de Equipos</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nombre del Equipo</label>
            <input
              type="text"
              className="form-control"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Ej: Los Invencibles"
            />
          </div>

          <h4>Selecciona Jugadores (Máximo 5)</h4>
          <ul className="list-group mb-3">
            {players.length > 0 ? (
              players.map((player, index) => (
                <li
                  key={index}
                  className={`list-group-item ${selectedPlayers.includes(player) ? 'list-group-item-success' : ''}`}
                  onClick={() => togglePlayerSelection(player)}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{player.name} {player.lastName}</strong> - Apodo: {player.nickname} - Nivel: {player.skillLevel}
                </li>
              ))
            ) : (
              <p className="text-muted">No hay jugadores registrados.</p>
            )}
          </ul>

          <button className="btn btn-primary w-100" onClick={handleCreateTeam}>Crear Equipo</button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center text-primary">Equipos Creados</h3>
        {teams.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre del Equipo</th>
                <th>Jugadores</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td>{team.name}</td>
                  <td>
                    <ul>
                      {team.players.map((player, idx) => (
                        <li key={idx}>{player.name} {player.lastName} (Apodo: {player.nickname})</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">Aún no hay equipos creados.</p>
        )}
      </div>
    </div>
  );
}

export default TeamManager;
