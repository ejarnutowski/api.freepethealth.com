const ApplicationError = require('./ApplicationError');

module.exports = class NotFoundError extends ApplicationError {
  constructor(message) {
    super();
    this.statusCode = 404;
    this.message = message || 'Not found';
  }
};