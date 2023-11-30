const ResponseError = require('./ResponseError');

/**
 * Error class for representing server errors.
 * @extends ResponseError
 * @class ServerError
 *
 * @example
 * // Creating a new ServerError instance
 * const serverError = new ServerError();
 */
class ServerError extends ResponseError {
  /**
   * @constructor
   */
  constructor() {
    super('Terjadi kesalahan pada server', 500, 'Internal Server Error');
  }
}

module.exports = ServerError;
