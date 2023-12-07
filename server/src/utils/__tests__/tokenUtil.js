const jwt = require('jsonwebtoken');
const tokenUtil = require('../tokenUtil');
const { jwtSecret } = require('../../../config/security');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('token utilities', () => {
  describe('generate token', () => {
    it('should return a token', () => {
      const payload = { foo: 'bar' };
      const token = 'token';

      jwt.sign.mockReturnValueOnce(token);

      const result = tokenUtil.generateToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith({ data: payload }, jwtSecret, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });
      expect(result).toBe(token);
    });
  });

  describe('verify token', () => {
    it('should return payload when token verified', () => {
      const token = 'token';
      const payload = { foo: 'bar' };

      jwt.verify.mockReturnValueOnce({ data: payload });

      const result = tokenUtil.verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, jwtSecret);
      expect(result).toEqual(payload);
    });

    it('should return null when token not verified', () => {
      const token = 'token';

      jwt.verify.mockImplementationOnce(() => {
        throw new Error();
      });

      const result = tokenUtil.verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, jwtSecret);
      expect(result).toBeNull();
    });
  });
});
