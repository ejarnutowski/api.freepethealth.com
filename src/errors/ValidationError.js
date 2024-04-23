const ApplicationError = require('./ApplicationError');

module.exports = class ValidationError extends ApplicationError {
  constructor(source, field, details, message) {
    super();
    this.statusCode = 400;
    this.source = source;
    this.field = field;
    this.details = details;
    this.message = message || 'Bad request';
  }
};


