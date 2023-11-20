const ResponseError = require('./ResponseError');

// Desc: Error class for forbidden access
class ForbiddenError extends ResponseError {
  constructor() {
    super('Anda tidak memiliki akses', 403);
  }
}

module.exports = ForbiddenError;
