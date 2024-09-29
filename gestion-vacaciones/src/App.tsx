import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Importamos el componente Navbar
import SolicitarVacaciones from './pages/SolicitarVacaciones';
import Inicio from './pages/Inicio';
import AprobacionVacaciones from './pages/AprobacionVacaciones';
import GestionUsuarios from './pages/GestionUsuarios';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <Navbar /> {/* Colocamos la Navbar para que aparezca en todas las páginas */}
      <Routes>
        <Route path="/" element={<Inicio />} />
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
