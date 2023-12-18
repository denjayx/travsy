const ResponseError = require('./ResponseError');

// Desc: Error class for bad request
class BadRequestError extends ResponseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
