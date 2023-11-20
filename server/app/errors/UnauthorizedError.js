const ResponseError = require('./ResponseError');

class UnauthorizedError extends ResponseError {
  constructor() {
    super('Anda belum login', 401);
  }
}

module.exports = UnauthorizedError;
