const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');  // Importamos la conexión a MySQL
const vacacionesRoutes = require('./routes/vacaciones');  // Importamos las rutas de vacaciones
const usuariosRoutes = require('./routes/usuarios');  // Importamos las rutas de usuarios

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas de la API
app.use('/api/vacaciones', vacacionesRoutes);  // Rutas para las vacaciones
app.use('/api/usuarios', usuariosRoutes);      // Rutas para los usuarios

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
