import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../StylesPages/Perfil.css';

// Definir las interfaces para los datos del perfil
interface SolicitudVacaciones {
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

interface PerfilUsuario {
  nombre: string;
  diasVacacionesDisponibles: number;
  historial: SolicitudVacaciones[];
}

const Perfil: React.FC = () => {
  // Estado para almacenar los datos del perfil
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);

  useEffect(() => {
    // Realiza la solicitud al backend para obtener los datos del perfil del usuario
    fetch('/api/usuarios/perfil')
      .then((response) => response.json())
      .then((data) => setPerfil(data))
      .catch((error) => console.error('Error al cargar el perfil:', error));
  }, []);

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Mi Perfil</h1>
      <p>Nombre: {perfil.nombre}</p>
      <p>Días de vacaciones disponibles: {perfil.diasVacacionesDisponibles}</p>
      <h2>Historial de solicitudes</h2>
      <ul>
        {perfil.historial.map((solicitud, index) => (
          <li key={index}>
            Del {solicitud.fechaInicio} al {solicitud.fechaFin} - {solicitud.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Perfil;
