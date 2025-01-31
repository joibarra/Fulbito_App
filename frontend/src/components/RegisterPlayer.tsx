import { useState, ChangeEvent, FormEvent } from 'react';

interface Player {
  name: string;
  lastName: string;
  age: string;
  nickname: string;
  skillLevel: string;
}

interface RegisterPlayerProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>; // ✅ Tipo correcto para `setPlayers`
}

function RegisterPlayer({ players, setPlayers }: RegisterPlayerProps) {
  const [player, setPlayer] = useState<Player>({
    name: '',
    lastName: '',
    age: '',
    nickname: '',
    skillLevel: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setPlayers([...players, player]); // ✅ Actualiza la lista global

    setPlayer({
      name: '',
      lastName: '',
      age: '',
      nickname: '',
      skillLevel: ''
    });

    alert('Jugador registrado exitosamente.');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h2 className="text-center">Registrar Jugador</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="name" value={player.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" name="lastName" value={player.lastName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input type="number" className="form-control" name="age" value={player.age} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Apodo</label>
              <input type="text" className="form-control" name="nickname" value={player.nickname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Nivel de Habilidad (1-10)</label>
              <input type="number" className="form-control" name="skillLevel" value={player.skillLevel} onChange={handleChange} required min="1" max="10" />
            </div>
            <button type="submit" className="btn btn-success w-100">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPlayer;
