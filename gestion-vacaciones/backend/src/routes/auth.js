const express = require('express');
const router = express.Router();
const db = require('../db');  // Asegúrate de importar db correctamente

// Ruta para registrar usuarios
router.post('/register', (req, res) => {
    const { nombre, email, password, role } = req.body;
    
    // Validar que los campos no estén vacíos
    if (!nombre || !email || !password || !role) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
    
    // Usar 'db' correctamente para hacer la consulta a la base de datos
    db.query(query, [nombre, email, password, role], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).send('Error en el servidor');
        }
        res.status(200).send('Usuario registrado con éxito');
    });
});

module.exports = router;
