const BaseResponseError = require('./BaseResponseError');

/**
 * Error class for representing server errors.
 * @extends BaseResponseError
 * @class ServerError
 *
 * @example
 * // Creating a new ServerError instance
 * const serverError = new ServerError();
 */
class ServerError extends BaseResponseError {
  /**
   * @constructor
   */
  constructor() {
    super('An error occurred on the server', 500, 'Internal Server Error');
  }
}

module.exports = ServerError;
