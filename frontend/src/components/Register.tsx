// components/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      // Aquí podrías guardar el usuario en una base de datos o en el estado global
      alert('Usuario registrado exitosamente');
      navigate('/login'); // Redirige al login después del registro
    } else {
      setError('Por favor, completa todos los campos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h2 className="text-center">Registrarse</h2>
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
          <button className="btn btn-success w-100" onClick={handleRegister}>
            Registrarse
          </button>
          <p className="text-center mt-3">
            ¿Ya tienes una cuenta?{' '}
            <button
              className="btn btn-link"
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;