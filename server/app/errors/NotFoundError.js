const ResponseError = require('./ResponseError');

class NotFoundError extends ResponseError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
