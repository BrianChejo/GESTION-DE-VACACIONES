import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/solicitar-vacaciones">Solicitar Vacaciones</Link></li>
        <li><Link to="/aprobacion-vacaciones">Aprobación de Vacaciones</Link></li>
        <li><Link to="/calendario">Calendario</Link></li>
        <li><Link to="/usuarios">Gestión de Usuarios</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
