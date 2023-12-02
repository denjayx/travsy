const tokenUtil = require('../utils/tokenUtil');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const verifyAuthorization = (req, res, next) => {
  // get bearer token
  const { authorization } = req.headers;

  if (!authorization) {
    throw new BadRequestError('Authorization header not found');
  }

  const token = authorization.split(' ')[1];

  const payload = tokenUtil.verifyToken(token);

  if (!payload) {
    throw new UnauthorizedError('Invalid token');
  }
  req.user = payload;

  next();
};

module.exports = verifyAuthorization;
