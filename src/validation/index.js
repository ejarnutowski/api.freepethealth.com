const joi = require('joi');
const ValidationError = require('../errors/ValidationError');

const validate = (req, schema) => {
  const sources = [
    'headers',
    'body',
    'query',
    'params',
    'cookies',
  ];
  sources.forEach(source => {
    if (!schema[source]) return;
    const result = joi.object(schema[source]).validate(req[source]);
    if (result.error) {
      throw new ValidationError(
        source,
        result.error.details[0].context.label,
        result.error.details[0].message,
      );
    }
  });
};

module.exports = {
  validate,
};