const ResponseError = require('./ResponseError');

// Desc: Error class for unauthorized access
class UnauthorizedError extends ResponseError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
