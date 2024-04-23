const log = require('./services/logger');
const shutdown = require('./shutdown');

/*
 * NOTE: This is a global application error handler and is
 * intended to handle errors triggered outside of the API
 * request/response lifecycle. The request/response error
 * handler is located at /src/middleware/handleError.js
 */
module.exports = async error => {
  log.error({
    message: 'Application error',
    error: error,
  });
  await shutdown(error);
};
