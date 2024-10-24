const Usuario = require('../models/usuario');  // Importa desde el archivo correcto
const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar las fotos de perfil
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las fotos
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Controlador para obtener los datos del perfil de un usuario
const obtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);  // Asegúrate de que req.userId esté disponible
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);  // Asegúrate de devolver un JSON
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el perfil', error });
    }
};


// Controlador para actualizar el perfil, incluida la foto
const actualizarPerfil = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const usuario = await Usuario.findByPk(req.userId);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.descripcion = descripcion || usuario.descripcion;

        if (req.file) {
            usuario.fotoPerfil = req.file.path;  // Guarda la ruta del archivo subido
        }

        await usuario.save();
        res.json({ mensaje: 'Perfil actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el perfil', error });
    }
};

module.exports = {
    obtenerPerfil,
    actualizarPerfil,
    upload
};
