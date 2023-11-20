const ResponseError = require('./ResponseError');

class ForbiddenError extends ResponseError {
  constructor() {
    super('Anda tidak memiliki akses', 403);
  }
}

module.exports = ForbiddenError;
