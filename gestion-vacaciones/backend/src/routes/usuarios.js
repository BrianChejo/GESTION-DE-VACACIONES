const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para crear un nuevo usuario
router.post('/crear', usuariosController.crearUsuario);

// Ruta para listar todos los usuarios
router.get('/', usuariosController.listarUsuarios);

// Ruta para eliminar un usuario
router.delete('/eliminar/:id', usuariosController.eliminarUsuario);

module.exports = router;
