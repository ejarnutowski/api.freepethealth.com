const uuid = require('uuid').v4;
const log = require('../services/logger');

module.exports = (req, res, next) => {

  req.requestId = uuid();
  req.requestTimestamp = new Date();

  res.on('finish', () => {

    const responseTime = new Date();
    const payload = {
      message: 'HTTP request',
      data: {
        requestId: req.requestId,
        requestTimestamp: req.requestTimestamp,
        responseTimestamp: responseTime,
        totalTime: responseTime - req.requestTimestamp,
        request: {
          ipAddress: req.ip,
          method: req.method,
          protocol: req.protocol,
          hostname: req.hostname,
          path: req.originalUrl.split('?')[0],
          query: req.query,
          headers: req.headers,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
    };

    // Redact authorization header - Sensitive data
    if (payload.data.request.headers.authorization) {
      payload.data.request.headers.authorization = '[REDACTED]';
    }

    // Redact cookie header - Sensitive data
    if (payload.data.request.headers.cookie) {
      payload.data.request.headers.cookie = '[REDACTED]';
    }

    if (res.statusCode < 400) {
      log.info(payload);
    } else if (res.statusCode < 500) {
      log.warn(payload);
    } else {
      log.error(payload);
    }

  });

  next();
};
