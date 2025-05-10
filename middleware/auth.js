// middleware/auth.js

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please log in to continue');
  res.redirect('/login');
}

function checkRole(...roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).send('Forbidden: You do not have permission to access this resource');
  };
}

module.exports = { ensureAuthenticated, checkRole };
