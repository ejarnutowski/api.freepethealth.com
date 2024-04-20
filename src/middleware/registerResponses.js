module.exports = (req, res, next) => {

  /**
   * Send error response
   *
   * @param {Error} error
   */
  res.sendError = error => {
    const body = {
      error: {
        requestId: req.requestId,
        message: error.message,
      }
    };
    res.status(error.statusCode).send(body);
  };

  next();
};