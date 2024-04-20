const joi = require('joi');

module.exports = {
  mongoDbId: joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  unixTimestamp: joi.number().integer().min(100000000).max(9999999999),
};
