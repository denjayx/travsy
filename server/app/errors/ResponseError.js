class ResponseError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    this.name = this.constructor.name;

    if (this.constructor.name === 'ResponseError') {
      throw new TypeError(
        'Abstract class "ResponseError" cannot be instantiated directly.',
      );
    }
  }
}

module.exports = ResponseError;
