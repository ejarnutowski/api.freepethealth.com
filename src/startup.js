const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const config = require('./config');
const corsConfig = require('./config/cors');
const handleError = require('./middleware/handleError');
const log = require('./services/logger');
const logRequest = require('./middleware/logRequest');
const modelRegistry = require('./db/models/registry');
const mongodb = require('./services/mongodb');
const registerResponses = require('./middleware/registerResponses');
const routes = require('./routes');

module.exports = async () => {

  log.info('Application starting');

  await mongodb.connect();
  modelRegistry.register();

  const app = express();

  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.use(logRequest);
  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(registerResponses);
  app.use(express.json());
  app.use(routes);
  app.use(handleError);

  const server = http.createServer(app);
  server.listen(config.app.port);

  log.info('Application started');
};
