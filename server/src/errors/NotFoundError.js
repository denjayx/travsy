const BaseResponseError = require('./BaseResponseError');

/**
 * Error class for representing not found errors.
 * @extends BaseResponseError
 * @class NotFoundError
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new NotFoundError instance
 * const notFoundError = new NotFoundError('Resource not found');
 */
class NotFoundError extends BaseResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 404, 'Not Found');
  }
}

module.exports = NotFoundError;
