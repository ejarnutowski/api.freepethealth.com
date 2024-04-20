const config = require('.');

module.exports = {
  origin: config.cors.origins[config.app.env],
};
