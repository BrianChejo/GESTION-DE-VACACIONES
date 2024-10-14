import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SolicitarVacaciones from './pages/SolicitarVacaciones';
import Inicio from './pages/Inicio';
import AprobacionVacaciones from './pages/AprobacionVacaciones';
import GestionUsuarios from './pages/GestionUsuarios';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir la ruta raíz ("/") a la página de Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Otras rutas de la aplicación */}
        <Route path="/solicitar-vacaciones" element={<SolicitarVacaciones />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/aprobacion-vacaciones" element={<AprobacionVacaciones />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/usuarios" element={<GestionUsuarios />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
