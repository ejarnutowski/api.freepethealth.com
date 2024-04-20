module.exports = class ApplicationError extends Error {
  constructor(message) {
    super();
    this.statusCode = 500;
    this.message = message || 'Application error';
  }
};