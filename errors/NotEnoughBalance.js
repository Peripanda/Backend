const ApplicationError = require('./ApplicationError');

class NotEnoughBalance extends ApplicationError {
  constructor(message) {
    super(message || 'Tu balance no es suficiente para realizar esta inversion', 400);
  }
}
module.exports = NotEnoughBalance;
