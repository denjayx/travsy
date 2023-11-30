/**
 * Custom error class for representing response-related errors.
 * @extends Error
 * @class
 *
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 * @param {string} statusMessage - The HTTP status message associated with the error.
 *
 * @throws {TypeError}
 * Throws a TypeError if an attempt is made to instantiate the abstract class directly.
 *
 * @example
 * // Creating a new ResponseError instance
 * const responseError = new ResponseError('Error message', 400, 'Bad Request');
 */
class ResponseError extends Error {
  /**
   * @constructor
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} statusMessage - The HTTP status message associated with the error.
   */
  constructor(message, statusCode, statusMessage) {
    super(message);

    /**
     * The HTTP status code associated with the error.
     * @member {number}
     */
    this.statusCode = statusCode;

    /**
     * The HTTP status message associated with the error.
     * @member {string}
     */
    this.statusMessage = statusMessage;

    /**
     * The name of the error class.
     * @member {string}
     */
    this.name = this.constructor.name;

    if (this.constructor.name === 'ResponseError') {
      /**
       * Throws a TypeError if an attempt is made to instantiate the abstract class directly.
       * @throws {TypeError}
       */
      throw new TypeError(
        'Abstract class "ResponseError" cannot be instantiated directly.',
      );
    }
  }
}

module.exports = ResponseError;
