import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Importar FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para la vista de cuadrícula
import Navbar from '../components/Navbar';
import '../StylesPages/Calendario.css';


const Calendario: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Calendario de Vacaciones</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Vacaciones Juan', start: '2024-09-25', end: '2024-09-30' },
          { title: 'Vacaciones Ana', start: '2024-10-10', end: '2024-10-15' }
        ]}
      />
    </div>
  );
};

export default Calendario;
