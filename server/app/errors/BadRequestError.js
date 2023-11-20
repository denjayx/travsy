const ResponseError = require('./ResponseError');

class BadRequestError extends ResponseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = BadRequestError;
