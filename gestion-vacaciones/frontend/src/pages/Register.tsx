import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../StylesPages/Register.css'; 

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { nombre, email, password, role });
      setSuccess('Usuario registrado con éxito');
      setNombre('');
      setEmail('');
      setPassword('');
      setRole('cliente');
    } catch (err) {
      setError('Error al registrar el usuario.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="recursos_humanos">Recursos Humanos</option>
          <option value="administrador">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <Link to="/login" className="login-link">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
    </div>
  );
};

export default Register;
