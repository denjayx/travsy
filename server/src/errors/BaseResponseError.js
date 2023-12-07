/**
 * Abstract base class for representing response-related errors.
 * @extends Error
 * @abstract
 * @class
 */
class BaseResponseError extends Error {
  /**
   * Constructor for the BaseResponseError class.
   * It prevents direct instantiation of the abstract class
   * @constructor
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} statusMessage - The HTTP status message associated with the error.
   *
   * @throws {TypeError}
   * Throws a TypeError if an attempt is made to instantiate the abstract class directly.
   */
  constructor(message, statusCode, statusMessage) {
    super(message);

    if (this.constructor.name === 'ResponseError') {
      throw new TypeError(
        'Abstract class "ResponseError" cannot be instantiated directly',
      );
    }
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
  }
}

module.exports = BaseResponseError;
