import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validación básica
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      navigate('/app'); // Redirige a la aplicación
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Iniciar Sesión</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <p className="text-center mt-3">
            ¿No tienes una cuenta?{' '}
            <button
              className="btn btn-link"
              onClick={() => navigate('/register')}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;