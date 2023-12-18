const errorHandler = (err, req, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = errorHandler;
