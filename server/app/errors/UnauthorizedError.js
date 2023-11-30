const ResponseError = require('./ResponseError');

/**
 * Error class for representing unauthorized access errors.
 * @extends ResponseError
 * @class UnauthorizedError
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new UnauthorizedError instance
 * const unauthorizedError = new UnauthorizedError('Access denied');
 */
class UnauthorizedError extends ResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 401, 'Unauthorized');
  }
}

module.exports = UnauthorizedError;
