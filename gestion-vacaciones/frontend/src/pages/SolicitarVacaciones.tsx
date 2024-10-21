import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Importamos el componente Navbar
import '../StylesPages/SolicitarVacaciones.css';

const SolicitarVacaciones: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');

  const handleSolicitarVacaciones = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/vacaciones/solicitar', {
      empleado_id: 1,  // Cambia este ID dinámicamente según el usuario logueado
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    })
    .then(response => alert('Solicitud enviada correctamente'))
    .catch(error => console.error('Error al enviar la solicitud:', error));
    console.log('Solicitando vacaciones desde:', fechaInicio, 'hasta:', fechaFin);
  };

  return (
    <div className="solicitar-vacaciones-container">
      <Navbar /> {/* Agregamos la barra de navegación */}
      <div className="solicitar-vacaciones-card">
        <h2>Solicitar Vacaciones</h2>
        <form className="solicitar-vacaciones-form" onSubmit={handleSolicitarVacaciones}>
          <div>
            <label htmlFor="fechaInicio">Fecha de Inicio:</label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="fechaFin">Fecha de Fin:</label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="solicitar-vacaciones-button">
            Solicitar Vacaciones
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitarVacaciones;
