const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vacacionesRoutes = require('./routes/vacaciones');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');  // Importamos las rutas de autenticación

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Cambia esto al puerto de tu frontend si es diferente
}));
app.use(bodyParser.json());

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas de la API
app.use('/api/vacaciones', vacacionesRoutes);  // Rutas para vacaciones
app.use('/api/usuarios', usuariosRoutes);      // Rutas para usuarios
app.use('/api', authRoutes);                   // Rutas para autenticación (login, register)

// Configurar el directorio de uploads para servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
