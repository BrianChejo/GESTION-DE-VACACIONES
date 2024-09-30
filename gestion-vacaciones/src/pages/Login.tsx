import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // Importamos Link para el enlace a Registro
import './FormStyles.css';  // Reutilizamos los estilos del formulario

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { role } = response.data;
      
      // Redireccionar según el rol del usuario
      if (role === 'cliente') {
        navigate('/cliente-dashboard');
      } else if (role === 'recursos_humanos') {
        navigate('/recursos-humanos-dashboard');
      } else if (role === 'administrador') {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Contraseña:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Iniciar Sesión</button>

        {error && <p className="error">{error}</p>}
      </form>

      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>  {/* Enlace a registro */}
    </div>
  );
};

export default Login;
