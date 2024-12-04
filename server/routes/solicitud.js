// server/routes/solicitud.js
const express = require('express');
const router = express.Router();
const { isAuthenticated, authorize } = require('../middleware');
const db = require('../db');

// Obtener solicitudes pendientes con nombres de usuario
router.get('/pendientes2', (req, res) => {
  const query = `
    SELECT s.id, u.nombre AS usuario, s.fecha_inicio, s.fecha_fin, s.estado
    FROM solicitudes_vacaciones s
    INNER JOIN usuarios u ON s.user_id = u.id
    WHERE s.estado = 'pendiente'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes pendientes:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener solicitudes pendientes' });
    }
    res.status(200).json({ success: true, solicitudes: results });
  });
});

// Obtener historial de solicitudes con nombres de usuario
router.get('/historial2', (req, res) => {
  // Obtener todas las solicitudes
  const solicitudesQuery = `
    SELECT id, user_id, fecha_inicio, fecha_fin, estado
    FROM solicitudes_vacaciones
  `;
  
  // Obtener todos los usuarios
  const usuariosQuery = `
    SELECT id, nombre
    FROM usuarios
  `;
  
  db.query(solicitudesQuery, (err, solicitudes) => {
    if (err) {
      console.error('Error al obtener solicitudes:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener las solicitudes' });
    }

    db.query(usuariosQuery, (err, usuarios) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        return res.status(500).json({ success: false, message: 'Error al obtener los usuarios' });
      }

      // Asocia los nombres de usuario a las solicitudes
      const solicitudesConNombres = solicitudes.map(solicitud => {
        const usuario = usuarios.find(u => u.id === solicitud.user_id);
        return {
          ...solicitud,
          usuario: usuario ? usuario.nombre : 'Usuario no encontrado'
        };
      });

      // Responder con el historial de solicitudes
      res.json({ success: true, solicitudes: solicitudesConNombres });
    });
  });
});



// Ruta para obtener todas las solicitudes pendientes del usuario autenticado
router.get('/solicitudesPendientes', isAuthenticated, (req, res) => {
  const user_id = req.session.user ? req.session.user.id : null;

  if (!user_id) {
      return res.status(401).json({ success: false, message: 'No autenticado' });
  }

  const query = 'SELECT * FROM solicitudes_vacaciones WHERE user_id = ? AND estado = "Pendiente"';
  db.query(query, [user_id], (err, results) => {
      if (err) {
          console.error('Error al obtener las solicitudes pendientes:', err);
          return res.status(500).json({ success: false, message: 'Error al obtener las solicitudes pendientes' });
      }

      res.json({ success: true, solicitudes: results });
  });
});

// Ruta para eliminar una solicitud
router.delete('/eliminar/:id', isAuthenticated, authorize(['administrador']), (req, res) => {
  const solicitudId = req.params.id;

  const query = 'DELETE FROM solicitudes_vacaciones WHERE id = ?';
  db.query(query, [solicitudId], (err, results) => {
      if (err) {
          console.error('Error al eliminar la solicitud:', err);
          return res.status(500).json({ success: false, message: 'Error al eliminar la solicitud' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      }
      res.json({ success: true, message: 'Solicitud eliminada correctamente' });
  });
});

 // Ruta para modificar una solicitud (modificar motivo, fecha_inicio y fecha_fin)
router.put('/modificar/:id', isAuthenticated, (req, res) => {
  const solicitudId = req.params.id;
  const { motivo, fecha_inicio, fecha_fin } = req.body;
  const user_id = req.session.user ? req.session.user.id : null;
  // Consulta SQL para actualizar motivo, fecha_inicio y fecha_fin
  const query = 'UPDATE solicitudes_vacaciones SET motivo = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ? AND user_id = ?';
  db.query(query, [motivo, fecha_inicio, fecha_fin, solicitudId, user_id], (err, results) => {
      if (err) {
          console.error('Error al modificar la solicitud:', err);
          return res.status(500).json({ success: false, message: 'Error al modificar la solicitud' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      }

      res.json({ success: true, message: 'Solicitud modificada correctamente' });
  });
});
 // Ruta para modificar una solicitud (modificar motivo, fecha_inicio, fecha_fin y estado)-------------------- para admin
 router.put('/modificar1/:id', (req, res) => {
  const solicitudId = req.params.id;
  const { motivo, fecha_inicio, fecha_fin, estado} = req.body;
  const query = `
    UPDATE solicitudes_vacaciones 
    SET motivo = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? 
    WHERE id = ?
  `;

  // Ejecutar la consulta
  db.query(query, [motivo, fecha_inicio, fecha_fin, estado, solicitudId], (err, results) => {
    if (err) {
      console.error('Error al modificar la solicitud: ', err);
      return res.status(500).json({ success: false, message: 'Error al modificar la solicitud' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Solicitud no encontrada o no pertenece al usuario' });
    }

    res.json({ success: true, message: 'Solicitud modificada correctamente' });
  });
});


router.get('/solicitudesUsuario/:id', isAuthenticated, (req, res) => {
  // Asegúrate de que req.session.user está disponible
  const user_id = req.params.id;
  
  if (!user_id) {
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }

  const query = 'SELECT * FROM solicitudes_vacaciones WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error al obtener las solicitudes del usuario:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener las solicitudes' });
    }

    if (results.length === 0) {
      return res.json({ success: true, message: 'No se encontraron solicitudes', solicitudes: [] });
    }

    res.json({ success: true, solicitudes: results });
  });
});
// Ruta para obtener todas las solicitudes de un usuario específico (solo el usuario autenticado)-------------------------
router.get('/solicitudesUsuario', isAuthenticated, (req, res) => {
  // Asegúrate de que req.session.user está disponible
  const user_id = req.session.user ? req.session.user.id : null;
  
  if (!user_id) {
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }

  const query = 'SELECT * FROM solicitudes_vacaciones WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error al obtener las solicitudes del usuario:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener las solicitudes' });
    }

    if (results.length === 0) {
      return res.json({ success: true, message: 'No se encontraron solicitudes', solicitudes: [] });
    }

    res.json({ success: true, solicitudes: results });
  });
});

// Ruta para solicitar vacaciones (disponible para empleados y administradores)------------------------------------------
router.post('/solicitar', isAuthenticated, authorize(['empleado', 'administrador']), (req, res) => {
  const { nombre_empleado, fecha_inicio, fecha_fin, motivo } = req.body;

  // Validar los campos requeridos
  if (!nombre_empleado || !fecha_inicio || !fecha_fin || !motivo) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
  }

  // Buscar el ID del usuario a partir del nombre
  const queryBuscarId = 'SELECT id FROM usuarios WHERE nombre = ? LIMIT 1';
  db.query(queryBuscarId, [nombre_empleado], (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      return res.status(500).json({ success: false, message: 'Error al buscar el usuario' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
    }

    const user_id = results[0].id;

    // Realizar la inserción en la base de datos con el ID del empleado
    const queryInsertarSolicitud = 'INSERT INTO solicitudes_vacaciones (user_id, fecha_inicio, fecha_fin, motivo, estado) VALUES (?, ?, ?, ?, "pendiente")';
    db.query(queryInsertarSolicitud, [user_id, fecha_inicio, fecha_fin, motivo], (err) => {
      if (err) {
        console.error('Error al registrar la solicitud:', err);
        return res.status(500).json({ success: false, message: 'Error al registrar la solicitud' });
      }
      res.status(200).json({ success: true, message: 'Solicitud registrada correctamente' });
    });
  });
});
// Ruta para eliminar una solicitud
router.delete('/eliminar/:id', isAuthenticated, authorize(['administrador']), (req, res) => {
  const solicitudId = req.params.id;

  const query = 'DELETE FROM solicitudes_vacaciones WHERE id = ?';
  db.query(query, [solicitudId], (err, results) => {
      if (err) {
          console.error('Error al eliminar la solicitud:', err);
          return res.status(500).json({ success: false, message: 'Error al eliminar la solicitud' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      }
      res.json({ success: true, message: 'Solicitud eliminada correctamente' });
  });
});
// Ruta para obtener solicitudes pendientes (solo para administradores)--------------------------------------------
router.get('/pendientes', isAuthenticated, authorize(['administrador']), (req, res) => {
  const query = 'SELECT * FROM solicitudes_vacaciones WHERE estado = "pendiente"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener solicitudes' });
    }
    res.json({ success: true, solicitudes: results });
  });
});
// Ruta para obtener el historial de solicitudes (aprobadas/rechazadas)
router.get('/historial', isAuthenticated, authorize(['administrador']), (req, res) => {
  const query = 'SELECT * FROM solicitudes_vacaciones';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener historial de solicitudes:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener el historial de solicitudes' });
    }
    res.json({ success: true, solicitudes: results });
  });
});

// Ruta para obtener solicitudes (solo para administradores)--------------------------------------------
router.get('/pendientes', isAuthenticated, authorize(['administrador']), (req, res) => {
  const query = 'SELECT * FROM solicitudes_vacaciones';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes:', err);
      return res.status(500).json({ success: false, message: 'Error al obtener solicitudes' });
    }
    res.json({ success: true, solicitudes: results });
  });
});

// Ruta para aprobar solicitud (solo para administradores)--------------------------------------------------------
router.post('/aprobar/:id', isAuthenticated, authorize(['administrador']), (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE solicitudes_vacaciones SET estado = "aprobada" WHERE id = ?';
  
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al aprobar la solicitud:', err);
      return res.status(500).json({ success: false, message: 'Error al aprobar la solicitud' });
    }
    res.status(200).json({ success: true, message: 'Solicitud aprobada' });
  });
});

// Ruta para rechazar solicitud (solo para administradores)------------------------------------------------------
router.post('/rechazar/:id', isAuthenticated, authorize(['administrador']), (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE solicitudes_vacaciones SET estado = "rechazada" WHERE id = ?';
  
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al rechazar la solicitud:', err);
      return res.status(500).json({ success: false, message: 'Error al rechazar la solicitud' });
    }
    res.status(200).json({ success: true, message: 'Solicitud rechazada' });
  });
});

module.exports = router;
