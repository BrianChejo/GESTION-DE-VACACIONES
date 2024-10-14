const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',           // Cambia según el entorno (puede ser localhost o un host remoto)
    user: 'root',                // Usuario de MySQL (cambia si es necesario)
    password: '1234',   // Contraseña de MySQL
    database: 'gestion_vacaciones' // Nombre de la base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;
