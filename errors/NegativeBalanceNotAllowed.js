const ApplicationError = require('./ApplicationError');

class NegativeBalanceNotAllowed extends ApplicationError {
  constructor(message) {
    super(message || 'Tu balance no puede ser negativo', 400);
  }
}
module.exports = NegativeBalanceNotAllowed;