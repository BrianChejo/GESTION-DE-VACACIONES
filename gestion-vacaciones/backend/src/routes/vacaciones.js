const express = require('express');
const router = express.Router();
const vacacionesController = require('../controllers/vacacionesController');
module.exports = router;
const db = require('../db');  // Aquí también se utiliza 'db' para las consultas

// Ruta para solicitar vacaciones
router.post('/solicitar', (req, res) => {
    const { empleado_id, fecha_inicio, fecha_fin } = req.body;
    const query = 'INSERT INTO solicitudes_vacaciones (empleado_id, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, "pendiente")';

    db.query(query, [empleado_id, fecha_inicio, fecha_fin], (err, result) => {
        if (err) {
            console.error('Error al registrar la solicitud:', err);
            return res.status(500).send('Error al registrar la solicitud');
        }
        res.status(200).send('Solicitud registrada');
    });
});

// Otras rutas de vacaciones...

// Ruta para solicitar vacaciones
router.post('/solicitar', vacacionesController.solicitarVacaciones);

// Ruta para aprobar vacaciones
router.post('/aprobar/:id', vacacionesController.aprobarVacaciones);

// Ruta para rechazar vacaciones
router.post('/rechazar/:id', vacacionesController.rechazarVacaciones);

// Ruta para listar las solicitudes pendientes
router.get('/pendientes', vacacionesController.listarSolicitudesPendientes);

module.exports = router;
