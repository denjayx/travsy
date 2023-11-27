const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { jwtSecret } = require('../../config/security');

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new BadRequestError('Authorization header tidak ditemukan');
    }

    const token = authorization.split(' ')[1];

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    next(new UnauthorizedError('Token tidak valid'));
  }
};

module.exports = verifyAuthorization;
