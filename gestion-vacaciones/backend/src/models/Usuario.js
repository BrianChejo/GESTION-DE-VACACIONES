const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    fotoPerfil: {
        type: DataTypes.STRING, // Guarda la ruta de la imagen subida
    },
    // Otros campos que necesites
});

module.exports = Usuario;
