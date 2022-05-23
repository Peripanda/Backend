const ApplicationError = require('./ApplicationError');

class ConflictError extends ApplicationError {
  constructor(message) {
    super(message || 'Tu solicitud genera conflictos', 409);
  }
}
module.exports = ConflictError;
