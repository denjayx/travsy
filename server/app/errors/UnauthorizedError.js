const BaseResponseError = require('./BaseResponseError');

/**
 * Error class for representing unauthorized access errors.
 * @extends BaseResponseError
 * @class UnauthorizedError
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new UnauthorizedError instance
 * const unauthorizedError = new UnauthorizedError('Access denied');
 */
class UnauthorizedError extends BaseResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 401, 'Unauthorized');
  }
}

module.exports = UnauthorizedError;
