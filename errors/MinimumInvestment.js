const ApplicationError = require('./ApplicationError');

class MinimumInvestment extends ApplicationError {
  constructor(message) {
    super(message || 'El minimo monto a invertir es de 3500.', 400);
  }
}
module.exports = MinimumInvestment;
