// server/middleware.js

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ success: false, message: 'No autenticado' });
  }
}

function authorize(roles) {
  return (req, res, next) => {
    if (req.session && req.session.user && roles.includes(req.session.user.rol)) {
      return next();
    }else {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    
  };
}

module.exports = { isAuthenticated, authorize };
