const ExampleService = require('../services/ExampleService');

const exampleController = (req, res, next) => {
  try {
    const resultExample = ExampleService.getExample();
    res.status(200).json({
      message: resultExample,
    });
  } catch (error) {
    next(error);
  }
};

const exampleControllerError = (req, res, next) => {
  try {
    const resultExample = ExampleService.getExampleError();
    res.status(200).json({
      message: resultExample,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { exampleController, exampleControllerError };
