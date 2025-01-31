import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterPlayer from './components/RegisterPlayer';

interface Player {
    name: string;
    lastName: string;
    age: string;
    nickname: string;
    skillLevel: string;
}
import TeamManager from './components/TeamManager';

const users: { username: string; password: string }[] = [];

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const userExists = users.find(user => user.username === username && user.password === password);
        if (userExists) {
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#008000', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <h1>Bienvenido a Fulbito App</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            <button onClick={() => navigate('/register')} style={{ marginTop: '10px', backgroundColor: '#FFD700', color: 'black', border: 'none', padding: '10px', borderRadius: '5px' }}>Registrarse</button>
        </div>
    );
}

function Register() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        users.push({ username: newUsername, password: newPassword });
        alert('Usuario registrado con éxito');
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#FFD700', color: 'black', padding: '20px', borderRadius: '10px' }}>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <input 
                        type="text" 
                        placeholder="Nuevo Usuario" 
                        value={newUsername} 
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Nueva Contraseña" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

function Dashboard() {
    const [players, setPlayers] = useState<Player[]>([]);
    return (
        <div className="container mt-4">
            <h1 className="text-center text-success">Gestión de Jugadores y Equipos</h1>
            <RegisterPlayer players={players} setPlayers={setPlayers} />
            <TeamManager players={players} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
