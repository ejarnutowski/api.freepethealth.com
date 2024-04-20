require('dotenv').config();

const handleError = require('./src/error');
const startup = require('./src/startup');
const shutdown = require('./src/shutdown');

(async () => {
  process.once('SIGINT', () => shutdown());
  process.once('SIGTERM', () => shutdown());
  process.once('uncaughtException', error => handleError(error));
  process.once('unhandledRejection', error => handleError(error));
  await startup();
})().catch(error => handleError(error));
