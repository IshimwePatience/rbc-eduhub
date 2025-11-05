// Centralized error handlers
function notFound(req, res, next) {
  return res.status(404).json({ success: false, message: 'Not found' });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  return res.status(status).json({ success: false, message });
}

module.exports = { notFound, errorHandler };