const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {

  const headers = req.headers;
  const authHeader = headers['x-user-id'];

  if (!authHeader || !authHeader.length) {
    throw new UnauthorizedError;
  }

  req.userId = authHeader;

  next();
};
