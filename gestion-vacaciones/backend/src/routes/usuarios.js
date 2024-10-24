const express = require('express');
const router = express.Router();
const Usuario = require('./models/usuario');

// Definir el endpoint para obtener el perfil del usuario
router.get('/perfil', async (req, res) => {
    try {
        // Aquí deberías obtener el usuario de la base de datos
        const usuario = await Usuario.findByPk(req.user.id); // Asegúrate de que `req.user` esté definido
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});

module.exports = router;
