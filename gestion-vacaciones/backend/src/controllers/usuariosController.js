const db = require('../db');

// Función para crear un usuario
const crearUsuario = (req, res) => {
    const { nombre, email, rol } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)';

    db.query(query, [nombre, email, rol], (err, result) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            return res.status(500).send('Error al crear el usuario');
        }
        res.status(200).send('Usuario creado correctamente');
    });
};

// Función para listar todos los usuarios
const listarUsuarios = (req, res) => {
    const query = 'SELECT * FROM usuarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            return res.status(500).send('Error al obtener los usuarios');
        }
        res.status(200).json(results);
    });
};

// Función para eliminar un usuario
const eliminarUsuario = (req, res) => {
    const usuarioId = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id = ?';

    db.query(query, [usuarioId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).send('Error al eliminar el usuario');
        }
        res.status(200).send('Usuario eliminado correctamente');
    });
};

module.exports = {
    crearUsuario,
    listarUsuarios,
    eliminarUsuario
};
