// server/server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const { isAuthenticated, authorize } = require('./middleware');
const usuariosRoutes = require('./routes/usuarios');
const solicitudRoutes = require('./routes/solicitud');

const app = express();
const port = 3001;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // El dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permitir que se envíen cookies con las solicitudes
}));

// Configuración de sesiones
app.use(session({
  secret: 'mi_secreto_secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Configuración de Express para procesar JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta pública para verificar el servidor
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Rutas de usuarios (públicas y protegidas)
app.use('/usuarios', usuariosRoutes);

// Rutas de solicitudes (públicas y protegidas)
app.use('/solicitud', solicitudRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
