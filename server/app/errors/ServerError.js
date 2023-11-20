const ResponseError = require('./ResponseError');

class ServerError extends ResponseError {
  constructor() {
    super('Terjadi kesalahan pada server', 500);
  }
}

module.exports = ServerError;
