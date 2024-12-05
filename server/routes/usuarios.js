const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Registro de usuario
router.post('/registro2', (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Validar que los campos obligatorios no estén vacíos
  if (!nombre || !email || !password) {
      return res.json({ success: false, message: 'Faltan campos obligatorios' });
  }

  // Verificar si el usuario ya existe con ese email
  const checkUserQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
          console.error('Error al verificar el usuario:', err);
          return res.json({ success: false, message: 'Error al verificar el usuario' });
      }

      // Si ya existe un usuario con ese correo electrónico
      if (results.length > 0) {
          return res.json({ success: false, message: 'Este email ya está registrado' });
      }

      // Hash de la contraseña
      bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
              return res.json({ success: false, message: 'Error al procesar la contraseña' });
          }

          // Insertar los datos del usuario en la base de datos
          const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
          db.query(query, [nombre, email, hashedPassword, rol], (err, result) => {
              if (err) {
                  console.error('Error al registrar usuario:', err);
                  return res.json({ success: false, message: 'Error al registrar el usuario' });
              }

              // Responder con éxito
              res.json({ success: true, message: 'Usuario registrado correctamente' });
          });
      });
  });
});

// Registro de usuario
router.post('/registro', (req, res) => {
  const { nombre, email, password, rol = 'empleado' } = req.body;

  // Validar que los campos obligatorios no estén vacíos
  if (!nombre || !email || !password) {
      return res.json({ success: false, message: 'Faltan campos obligatorios' });
  }

  // Verificar si el usuario ya existe con ese email
  const checkUserQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
          console.error('Error al verificar el usuario:', err);
          return res.json({ success: false, message: 'Error al verificar el usuario' });
      }

      // Si ya existe un usuario con ese correo electrónico
      if (results.length > 0) {
          return res.json({ success: false, message: 'Este email ya está registrado' });
      }

      // Hash de la contraseña
      bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
              return res.json({ success: false, message: 'Error al procesar la contraseña' });
          }

          // Insertar los datos del usuario en la base de datos
          const query = 'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)';
          db.query(query, [nombre, email, hashedPassword, rol], (err, result) => {
              if (err) {
                  console.error('Error al registrar usuario:', err);
                  return res.json({ success: false, message: 'Error al registrar el usuario' });
              }

              // Responder con éxito
              res.json({ success: true, message: 'Usuario registrado correctamente' });
          });
      });
  });
});



// Login de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar usuario' });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = { id: user.id, rol: user.rol }; // Guardar en la sesión
      res.json({ message: 'Inicio de sesión exitoso', rol: user.rol });
    } else {
      res.status(401).json({ error: 'Contraseña incorrecta' });
    }
  });
});

// Obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
      res.json(results);
    });
  });
  
  // Obtener un usuario por ID
  router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
      res.json(results[0]);
    });
  });
  
  // Crear un nuevo usuario
  router.post('/alta', (req, res) => {
    const { nombre, email, password, descripcion, rol } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error al encriptar contraseña' });
  
      const query = 'INSERT INTO usuarios (nombre, email, password, descripcion, rol) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [nombre, email, hashedPassword, descripcion, rol], (err) => {
        if (err) return res.status(500).json({ error: 'Error al crear usuario' });
        res.json({ message: 'Usuario creado exitosamente' });
      });
    });
  });
  
  // Actualizar un usuario
  router.put('/:id', (req, res) => {
    const { nombre, email, descripcion, rol } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, descripcion = ?, rol = ? WHERE id = ?';
    db.query(query, [nombre, email, descripcion, rol, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  });
  
  // Eliminar un usuario
  router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
      res.json({ message: 'Usuario eliminado correctamente' });
    });
  });

  
module.exports = router;
