const ResponseError = require('./ResponseError');

// Desc: Error class for unauthorized access
class UnauthorizedError extends ResponseError {
  constructor() {
    super('Anda belum login', 401);
  }
}

module.exports = UnauthorizedError;
