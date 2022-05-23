const ApplicationError = require('./ApplicationError');

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'Existe un error en tu solicitud', 400);
  }
}
module.exports = BadRequestError;
