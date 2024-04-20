const log = require('../services/logger');
const levels = require('../services/logger/levels');
const ApplicationError = require('../errors/ApplicationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

const logError = (req, level, error, data = {}) => {
  log[level]({
    message: error.message,
    error,
    data: {
      ...data,
      requestId: req.requestId,
    },
  });
};

module.exports = (error, req, res, next) => {

  /*
  * ValidationError
  */
  if (error instanceof ValidationError) {
    logError(req, levels.warn, error, {
      source: error.source,
      field: error.field,
      message: error.message,
    });
    return res.sendError(error);
  }

  /*
   * UnauthorizedError
   */
  if (error instanceof UnauthorizedError) {
    logError(req, levels.warn, error);
    return res.sendError(error);
  }

  /*
   * NotFoundError
   */
  if (error instanceof NotFoundError) {
    logError(req, levels.warn, error);
    return res.sendError(error);
  }

  /*
   * ApplicationError
   *
   * This is the base error that all other errors should
   * extend therefore it's the last evaluated error
   */
  if (error instanceof ApplicationError) {
    logError(req, levels.error, error);
    return res.sendError(error);
  }

  /*
   * Default catch-all error
   */
  logError(req, levels.error, error);
  return res.sendError(error);
};
