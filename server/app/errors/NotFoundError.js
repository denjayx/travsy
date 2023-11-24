const ResponseError = require('./ResponseError');

// Desc: Error class for not found
class NotFoundError extends ResponseError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
