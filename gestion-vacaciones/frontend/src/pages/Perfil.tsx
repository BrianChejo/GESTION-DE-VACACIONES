import React from 'react';
import Navbar from '../components/Navbar';
import '../StylesPages/Perfil.css';


const Perfil: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Mi Perfil</h1>
      <p>Nombre: Juan Pérez</p>
      <p>Días de vacaciones disponibles: 10</p>
      <h2>Historial de solicitudes</h2>
      <ul>
        <li>Del 2024-08-10 al 2024-08-15 - Aprobado</li>
        <li>Del 2024-09-01 al 2024-09-05 - Rechazado</li>
      </ul>
    </div>
  );
};

export default Perfil;
