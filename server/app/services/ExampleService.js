const ServerError = require('../errors/ServerError');

class ExampleService {
  static getExample() {
    const result = 'this is example from service';
    return result;
  }

  static getExampleError() {
    throw new ServerError();
  }
}

module.exports = ExampleService;
