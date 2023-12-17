const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/security');

/**
 * Object containing utility functions for handling JSON Web Tokens (JWT).
 */
const tokenUtil = {
  /**
   * Generates a JSON Web Token (JWT) with the provided data payload.
   * @function
   * @param {object} payload - The data payload to be included in the JWT.
   * @returns {string} The generated JWT token.
   */
  generateToken: (payload) => {
    const token = jwt.sign(
      {
        data: payload,
      },
      jwtSecret,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      },
    );

    return token;
  },

  /**
   * Verifies the authenticity of a JSON Web Token (JWT).
   * @function
   * @param {string} token - The JWT token to be verified.
   * @returns {boolean} Returns true if the token is valid; otherwise, returns false.
   */
  verifyToken: (token) => {
    try {
      const payload = jwt.verify(token, jwtSecret).data;
      return payload;
    } catch (error) {
      return null;
    }
  },
};

module.exports = tokenUtil;
