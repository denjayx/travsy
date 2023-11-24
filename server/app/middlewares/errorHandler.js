// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = errorHandler;
