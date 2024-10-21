import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';  // Importamos la pantalla de Inicio
import SolicitarVacaciones from './pages/SolicitarVacaciones';
import AprobacionVacaciones from './pages/AprobacionVacaciones';
import GestionUsuarios from './pages/GestionUsuarios';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir a la pantalla de inicio de sesión */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Ruta para Inicio, que será la pantalla a la que redirigimos después del login */}
        <Route path="/inicio" element={<Inicio />} />
        
        {/* Otras rutas de la aplicación */}
        <Route path="/solicitar-vacaciones" element={<SolicitarVacaciones />} />
        <Route path="/aprobacion-vacaciones" element={<AprobacionVacaciones />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/usuarios" element={<GestionUsuarios />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
