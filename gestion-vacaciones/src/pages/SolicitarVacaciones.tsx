import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';

const SolicitarVacaciones: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/vacaciones/solicitar', {
      empleado_id: 1,  // Cambia este ID dinámicamente según el usuario logueado
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin
    })
    .then(response => alert('Solicitud enviada correctamente'))
    .catch(error => console.error('Error al enviar la solicitud:', error));
  };

  return (
    <div>
      <h2>Solicitar Vacaciones</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha de Inicio:</label>
        <input 
          type="date" 
          value={fechaInicio} 
          onChange={(e) => setFechaInicio(e.target.value)} 
          required 
        />

        <label>Fecha de Fin:</label>
        <input 
          type="date" 
          value={fechaFin} 
          onChange={(e) => setFechaFin(e.target.value)} 
          required 
        />

        <button type="submit">Solicitar Vacaciones</button>
      </form>
    </div>
  );
};

export default SolicitarVacaciones;
