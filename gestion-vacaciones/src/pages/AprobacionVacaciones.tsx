import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableStyles.css';

const AprobacionVacaciones: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vacaciones/pendientes')
      .then(response => setSolicitudes(response.data))
      .catch(error => console.error('Error al cargar solicitudes:', error));
  }, []);

  const aprobarSolicitud = (id: number) => {
    axios.post(`http://localhost:5000/api/vacaciones/aprobar/${id}`)
      .then(response => alert('Solicitud aprobada'))
      .catch(error => console.error('Error al aprobar solicitud:', error));
  };

  const rechazarSolicitud = (id: number) => {
    axios.post(`http://localhost:5000/api/vacaciones/rechazar/${id}`)
      .then(response => alert('Solicitud rechazada'))
      .catch(error => console.error('Error al rechazar solicitud:', error));
  };

  return (
    <div>
      <h1>Aprobación de Vacaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.id}>
              <td>{solicitud.empleado_id}</td>
              <td>{solicitud.fecha_inicio} - {solicitud.fecha_fin}</td>
              <td>
                <button onClick={() => aprobarSolicitud(solicitud.id)}>Aprobar</button>
                <button onClick={() => rechazarSolicitud(solicitud.id)}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AprobacionVacaciones;

/*interface SolicitudVacacion {
  id: number;
  empleado_id: number;
  fecha_inicio: string;
  fecha_fin: string;
}*/