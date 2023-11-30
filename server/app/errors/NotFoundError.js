const ResponseError = require('./ResponseError');

/**
 * Error class for representing not found errors.
 * @extends ResponseError
 * @class NotFoundError
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new NotFoundError instance
 * const notFoundError = new NotFoundError('Resource not found');
 */
class NotFoundError extends ResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 404, 'Not Found');
  }
}

module.exports = NotFoundError;
