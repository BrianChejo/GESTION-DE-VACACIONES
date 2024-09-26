const db = require('../db');

// Función para solicitar vacaciones
const solicitarVacaciones = (req, res) => {
    const { empleado_id, fecha_inicio, fecha_fin } = req.body;
    const query = 'INSERT INTO solicitudes_vacaciones (empleado_id, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, "pendiente")';

    db.query(query, [empleado_id, fecha_inicio, fecha_fin], (err, result) => {
        if (err) {
            console.error('Error al registrar la solicitud:', err);
            return res.status(500).send('Error al registrar la solicitud');
        }
        res.status(200).send('Solicitud de vacaciones registrada');
    });
};

// Función para aprobar una solicitud de vacaciones
const aprobarVacaciones = (req, res) => {
    const solicitudId = req.params.id;
    const query = 'UPDATE solicitudes_vacaciones SET estado = "aprobada" WHERE id = ?';

    db.query(query, [solicitudId], (err, result) => {
        if (err) {
            console.error('Error al aprobar la solicitud:', err);
            return res.status(500).send('Error al aprobar la solicitud');
        }
        res.status(200).send('Solicitud aprobada');
    });
};

// Función para rechazar una solicitud de vacaciones
const rechazarVacaciones = (req, res) => {
    const solicitudId = req.params.id;
    const query = 'UPDATE solicitudes_vacaciones SET estado = "rechazada" WHERE id = ?';

    db.query(query, [solicitudId], (err, result) => {
        if (err) {
            console.error('Error al rechazar la solicitud:', err);
            return res.status(500).send('Error al rechazar la solicitud');
        }
        res.status(200).send('Solicitud rechazada');
    });
};

// Función para listar las solicitudes de vacaciones pendientes
const listarSolicitudesPendientes = (req, res) => {
    const query = 'SELECT * FROM solicitudes_vacaciones WHERE estado = "pendiente"';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las solicitudes:', err);
            return res.status(500).send('Error al obtener las solicitudes');
        }
        res.status(200).json(results);
    });
};

module.exports = {
    solicitarVacaciones,
    aprobarVacaciones,
    rechazarVacaciones,
    listarSolicitudesPendientes
};
