import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Importamos Link para volver al login
import './FormStyles.css';  // Reutilizamos los estilos del formulario
import './Register.css';

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
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />

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

        <label>Tipo de Usuario:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="recursos_humanos">Recursos Humanos</option>
          <option value="administrador">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>

      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>  {/* Enlace al login */}
    </div>
  );
};

export default Register;
