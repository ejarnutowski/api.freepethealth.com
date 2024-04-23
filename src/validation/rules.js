const joi = require('joi');

module.exports = {
  boolean: joi.boolean(),
  mongoDbId: joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  object: joi.object(),
  string: joi.string(),
};
