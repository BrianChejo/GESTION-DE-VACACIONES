import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../StylesPages/GestionUsuarios.css';


const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    // Cargar la lista de usuarios
    axios.get('http://localhost:5000/api/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Gestión de Usuarios</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nombre} ({usuario.rol})
            <button>Editar</button>
            <button>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionUsuarios;
