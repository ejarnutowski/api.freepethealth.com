module.exports = (req, res, next) => {

  res.sendError = (req, statusCode, message) => {
    res.status(statusCode).send({
      error: {
        requestId: req.requestId,
        message,
      },
    });
  };

  res.sendNotFound = (req) => {
    res.status(404).send({
      error: {
        requestId: req.requestId,
        message: 'Not found',
      },
    });
  };

  next();
};