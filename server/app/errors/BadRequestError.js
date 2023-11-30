const ResponseError = require('./ResponseError');

/**
 * Error class for representing bad request errors.
 * @extends ResponseError
 * @class
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new BadRequestError instance
 * const badRequestError = new BadRequestError('Bad Request');
 */
class BadRequestError extends ResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 400, 'Bad Request');
  }
}

module.exports = BadRequestError;
