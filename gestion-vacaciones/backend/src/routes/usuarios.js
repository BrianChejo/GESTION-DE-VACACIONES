const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const { obtenerPerfil, actualizarPerfil, upload } = require('../controllers/usuariosController');

// Ruta para obtener los datos del perfil
router.get('/perfil', obtenerPerfil);

// Ruta para actualizar el perfil (incluyendo la carga de la foto de perfil)
router.post('/perfil', upload.single('fotoPerfil'), actualizarPerfil);

module.exports = router;
