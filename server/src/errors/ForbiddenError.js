const BaseResponseError = require('./BaseResponseError');

/**
 * Error class for representing forbidden access errors.
 * @extends BaseResponseError
 * @class ForbiddenError
 *
 * @example
 * // Creating a new ForbiddenError instance
 * const forbiddenError = new ForbiddenError();
 */
class ForbiddenError extends BaseResponseError {
  /**
   * @constructor
   * @param {string} [message='You do not have access'] - The error message.
   */
  constructor(message = 'You do not have access') {
    super(message, 403, 'Forbidden');
  }
}

module.exports = ForbiddenError;
