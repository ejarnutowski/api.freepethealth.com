const ApplicationError = require('./ApplicationError');

module.exports = class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super();
    this.statusCode = 401;
    this.message = message || 'Unauthorized';
  }
};