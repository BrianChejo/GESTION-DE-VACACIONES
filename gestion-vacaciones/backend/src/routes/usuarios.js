const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const db = require('../db');  // Aquí sí se utiliza 'db' para la conexión

// Ruta para crear un nuevo usuario
router.post('/crear', (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';

    db.query(query, [nombre, email, password, rol], (err, result) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            return res.status(500).send('Error al crear el usuario');
        }
        res.status(200).send('Usuario creado correctamente');
    });
});

// Otras rutas de usuarios...
// Ruta para crear un nuevo usuario
router.post('/crear', usuariosController.crearUsuario);

// Ruta para listar todos los usuarios
router.get('/', usuariosController.listarUsuarios);

// Ruta para eliminar un usuario
router.delete('/eliminar/:id', usuariosController.eliminarUsuario);

module.exports = router;
