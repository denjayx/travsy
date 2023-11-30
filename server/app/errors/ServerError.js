const ResponseError = require('./ResponseError');

// Desc: Error class for server error
class ServerError extends ResponseError {
  constructor() {
    super('Terjadi kesalahan pada server', 500);
  }
}

module.exports = ServerError;
