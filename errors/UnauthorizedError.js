const ApplicationError = require('./ApplicationError');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(
      message || 'No tienes autorización para realizar esta solicitud',
      401,
    );
  }
}
module.exports = UnauthorizedError;
