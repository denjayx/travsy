const BaseResponseError = require('./BaseResponseError');

/**
 * Error class for representing bad request errors.
 * @extends BaseResponseError
 * @class
 *
 * @param {string} message - The error message.
 *
 * @example
 * // Creating a new BadRequestError instance
 * const badRequestError = new BadRequestError('Input invalid');
 */
class BadRequestError extends BaseResponseError {
  /**
   * @constructor
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message, 400, 'Bad Request');
  }
}

module.exports = BadRequestError;
