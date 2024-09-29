import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

// Define un tipo para las solicitudes de vacaciones
interface SolicitudVacacion {
  id: number;
  empleado_id: number;
  fecha_inicio: string;
  fecha_fin: string;
}

const AprobacionVacaciones: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudVacacion[]>([]);

  useEffect(() => {
    // Obtener las solicitudes pendientes desde el backend
    axios.get<SolicitudVacacion[]>('http://localhost:5000/api/vacaciones/pendientes')
      .then(response => setSolicitudes(response.data))
      .catch((error: AxiosError) => console.error('Error al cargar solicitudes:', error));
  }, []);

  const aprobarSolicitud = (id: number) => {
    axios.post(`http://localhost:5000/api/vacaciones/aprobar/${id}`)
      .then(() => alert('Solicitud aprobada'))
      .catch((error: AxiosError) => console.error('Error al aprobar solicitud:', error));
  };

  const rechazarSolicitud = (id: number) => {
    axios.post(`http://localhost:5000/api/vacaciones/rechazar/${id}`)
      .then(() => alert('Solicitud rechazada'))
      .catch((error: AxiosError) => console.error('Error al rechazar solicitud:', error));
  };

  return (
    <div>
      <h1>Aprobación de Vacaciones</h1>
      <ul>
        {solicitudes.map(solicitud => (
          <li key={solicitud.id}>
            <p>Empleado: {solicitud.empleado_id}</p>
            <p>Fecha: {solicitud.fecha_inicio} - {solicitud.fecha_fin}</p>
            <button onClick={() => aprobarSolicitud(solicitud.id)}>Aprobar</button>
            <button onClick={() => rechazarSolicitud(solicitud.id)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AprobacionVacaciones;
