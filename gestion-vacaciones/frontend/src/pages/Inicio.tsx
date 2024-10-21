import React from 'react';
import Navbar from '../components/Navbar';
import '../StylesPages/Inicio.css';


const Inicio: React.FC = () => {
  return (

    <div>
      <Navbar />
      <h1>Bienvenido al Sistema de Gestión de Vacaciones</h1>
      <div>
        <h2>Resumen</h2>
        <p>Solicitudes pendientes: 3</p>
        <p>Días de vacaciones disponibles: 10</p>
      </div>
    </div>
  );
};

export default Inicio;
