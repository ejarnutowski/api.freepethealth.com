const mongoose = require('mongoose');
const config = require('../../config');
const log = require('../logger');

let connected = false;

const connect = async () => {
  return new Promise((resolve, reject) => {

    if (connected) return resolve();

    mongoose.connection.on('connecting', () => {
      log.info('MongoDB connecting');
    });

    mongoose.connection.on('connected', () => {
      connected = true;
      log.info('MongoDB connected');
    });

    mongoose.connection.on('disconnecting', data => {
      log.warn({
        message: 'MongoDB disconnecting',
        data: data,
      });
    });

    mongoose.connection.on('disconnected', data => {
      connected = false;
      log.warn({
        message: 'MongoDB disconnected',
        data: data,
      });
    });

    mongoose.connection.on('reconnected', () => {
      log.info('MongoDB reconnected');
    });

    mongoose.connection.on('reconnectFailed', data => {
      log.warn({
        message: 'MongoDB reconnect failed',
        data: data,
      });
    });

    mongoose.connection.on('close', () => {
      log.warn('MongoDB closed');
    });

    mongoose.connect(config.mongodb.uri).then(() => {
      mongoose.connection.on('error', error => {
        log.error({
          message: 'MongoDB error',
          error: error,
        });
      });
      resolve();
    }).catch(error => reject(error));
  });
};

const disconnect = () => {
  return new Promise(resolve => {
    if (connected) {
      mongoose.connection.on('close', resolve);
      mongoose.connection.close();
    } else {
      resolve();
    }
  });
};

module.exports = { connect, disconnect };