const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        if (results.length === 0) {
            return res.status(401).send('Correo o contraseña incorrectos');
        }

        const user = results[0];
        res.json({ role: user.rol });
    });
});

// Ruta para registrar usuarios
router.post('/register', (req, res) => {
    const { nombre, email, password, role } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';

    db.query(query, [nombre, email, password, role], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).send('Error en el servidor');
        }
        res.status(200).send('Usuario registrado con éxito');
    });
});

module.exports = router;
