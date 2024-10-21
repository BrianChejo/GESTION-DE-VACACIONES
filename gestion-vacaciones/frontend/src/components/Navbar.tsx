import React from 'react';
import { Link } from 'react-router-dom';
import '../StylesPages/Navbar.css';  // Importamos los estilos CSS

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/inicio">Gestión de Vacaciones</Link>  {/* Título o logo */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/inicio">Inicio</Link></li>
        <li><Link to="/solicitar-vacaciones">Solicitar Vacaciones</Link></li>
        <li><Link to="/aprobacion-vacaciones">Aprobación</Link></li>
        <li><Link to="/calendario">Calendario</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/login">Cerrar Sesión</Link></li> {/* Cerrar sesión */}
      </ul>
    </nav>
  );
};

export default Navbar;
