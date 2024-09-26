const express = require('express');
const router = express.Router();
const vacacionesController = require('../controllers/vacacionesController');

// Ruta para solicitar vacaciones
router.post('/solicitar', vacacionesController.solicitarVacaciones);

// Ruta para aprobar vacaciones
router.post('/aprobar/:id', vacacionesController.aprobarVacaciones);

// Ruta para rechazar vacaciones
router.post('/rechazar/:id', vacacionesController.rechazarVacaciones);

// Ruta para listar las solicitudes pendientes
router.get('/pendientes', vacacionesController.listarSolicitudesPendientes);

module.exports = router;
