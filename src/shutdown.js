const log = require('./services/logger');
const mongodb = require('./services/mongodb');
const sleep = require('./utils/sleep');

module.exports = async error => {

  log.warn('Application shutting down');

  await mongodb.disconnect();

  log.warn('Application shut down');

  await sleep(1000); // Wait for log to be received

  process.exit(error ? 1 : 0);
};
