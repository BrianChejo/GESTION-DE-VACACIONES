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
  descripcion?: string;
  diasVacacionesDisponibles: number;
  historial: SolicitudVacaciones[];
  fotoPerfil?: string; // Campo para la foto de perfil
}

const Perfil: React.FC = () => {
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios/perfil');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setPerfil(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error al cargar el perfil:', error);
          alert(`Error al cargar el perfil: ${error.message}`);
        } else {
          console.error('Error desconocido al cargar el perfil:', error);
          alert('Error desconocido al cargar el perfil.');
        }
      }
    };
  
    obtenerPerfil();
  }, []);
  
  const actualizarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }
    
    try {
      const response = await fetch('/api/usuarios/perfil', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPerfil(data.usuario); // Asegúrate de que la respuesta tenga la estructura correcta
      alert('Perfil actualizado');
    } catch (error: unknown) {  // Especificar el tipo de error
      if (error instanceof Error) {
        console.error('Error al actualizar el perfil:', error);
        alert(`Error al actualizar el perfil: ${error.message}`);
      } else {
        console.error('Error desconocido al actualizar el perfil:', error);
        alert('Error desconocido al actualizar el perfil.');
      }
    }
  };

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Mi Perfil</h1>
      {perfil.fotoPerfil && (
        <img src={`/${perfil.fotoPerfil}`} alt="Foto de perfil" width={100} />
      )}
      <p>Nombre: {perfil.nombre}</p>
      <p>Descripción: {perfil.descripcion || 'Sin descripción'}</p>
      <p>Días de vacaciones disponibles: {perfil.diasVacacionesDisponibles}</p>
      <h2>Historial de solicitudes</h2>
      <ul>
        {perfil.historial.map((solicitud, index) => (
          <li key={index}>
            Del {solicitud.fechaInicio} al {solicitud.fechaFin} - {solicitud.estado}
          </li>
        ))}
      </ul>
      <form onSubmit={actualizarPerfil} encType="multipart/form-data">
        <label htmlFor="fotoPerfil">Subir foto de perfil:</label>
        <input
          type="file"
          id="fotoPerfil"
          onChange={(e) => setFotoPerfil(e.target.files?.[0] || null)}
        />
        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default Perfil;
