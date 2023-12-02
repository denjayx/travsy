const jwt = require('jsonwebtoken');
const BaseResponseError = require('../errors/BaseResponseError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { jwtSecret } = require('../../config/security');

const verifyAuthorization = (req, res, next) => {
  // get bearer token
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new BadRequestError('Authorization header not found');
    }

    const token = authorization.split(' ')[1];

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    const errorThrowed =
      error instanceof BaseResponseError
        ? error
        : new UnauthorizedError('Invalid token');

    next(errorThrowed);
  }
};

module.exports = verifyAuthorization;
