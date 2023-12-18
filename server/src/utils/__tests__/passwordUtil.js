const passwordUtil = require('../passwordUtil');

describe('password utilities', () => {
  describe('hash password', () => {
    it('should return a hashed password', async () => {
      const password = 'testPassword';
      const hashedPassword = await passwordUtil.hashPassword(password);
      expect(typeof hashedPassword).toBe('string');
    });
  });

  describe('verify password', () => {
    it('should return true for a correct password', async () => {
      const password = 'testPassword';
      const hashedPassword = await passwordUtil.hashPassword(password);
      const isVerified = await passwordUtil.verifyPassword(
        password,
        hashedPassword,
      );
      expect(isVerified).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
      const password = 'testPassword';
      const incorrectPassword = 'incorrectPassword';
      const hashedPassword = await passwordUtil.hashPassword(password);
      const isVerified = await passwordUtil.verifyPassword(
        incorrectPassword,
        hashedPassword,
      );
      expect(isVerified).toBe(false);
    });
  });
});
