const os = require('os');
const safeStringify = require('fast-safe-stringify');
const winston = require('winston');

const config = require('../../config');
const filesize = require('../../utils/filesize');

const propertyWhitelist = [
  'level',
  'message',
  'data',
  'error',
];

const fileFormat = () => {
  const formatMessage = info => {
    const indent = `    `;
    let logLine = `[${info.level}] ${config.app.env} ${new Date().toISOString()} ${info.message}`;
    if (info.error instanceof Error) {
      logLine = `${logLine}${os.EOL}${indent}${info.error.stack}`;
    }
    if (info.data && Object.keys(info.data).length) {
      const dataString = safeStringify(info.data, null, 2);
      const indentedDataString = dataString
        .split(os.EOL)
        .map(line => `${indent}${line}${os.EOL}`)
        .join('');
      logLine = `${logLine}${os.EOL}${indentedDataString}`;
    }
    return logLine;
  };
  return winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(formatMessage),
  );
};

const datadogFormat = () => {
  const customFormatter = winston.format(info => {
    Object.keys(info).map(property => {
      if (!propertyWhitelist.includes(property)) {
        delete info[property];
      }
    });
    info.env = config.app.env;
    info.host = os.hostname();
    info.service = config.app.name;
    info.timestamp = new Date().toISOString();
    if (info.error instanceof Error) {
      info.error = {
        name: info.error.name,
        message: info.error.message,
        stack: info.error.stack,
      };
    }
    return info;
  });
  return winston.format.combine(
    customFormatter(),
    winston.format.json(),
  );
};

const fileTransport = new winston.transports.File({
  filename: config.logs.filePath,
  format: fileFormat(),
  maxsize: filesize.bytes['1GB'],
  maxFiles: 10,
  tailable: true,
});

const datadogTransport = new winston.transports.Http({
  host: config.datadog.logs.host,
  path: config.datadog.logs.path,
  format: datadogFormat(),
  ssl: true,
});

/**
 * Logger
 *
 * Acceptable formats
 *   log.<logLevel>(messageString);
 *   log.<logLevel>({
 *     message, (String) Required
 *     data,    (Object) Optional
 *     error,   (Error)  Optional
 *   }});
 */
module.exports = winston.createLogger({
  level: 'info',
  transports: [
    fileTransport,
    datadogTransport,
  ],
  exitOnError: false,
});
