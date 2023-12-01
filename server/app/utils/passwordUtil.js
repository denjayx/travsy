const bcrypt = require('bcrypt');

/**
 * Object containing utility functions for hashing and verifying passwords using bcrypt.
 */
const passwordUtil = {
  /**
   * Asynchronously generates a salt and hashes the given password.
   * @async
   * @param {string} password - The password to be hashed.
   * @returns {Promise<string>} A Promise that resolves with the hashed password.
   * @throws {Error} Throws an error if hashing fails.
   */
  hashPassword: async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  /**
   * @async
   * @param {string} inputPassword - The input password to be verified.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>}
   */
  verifyPassword: async (inputPassword, hashedPassword) => {
    const isVerified = await bcrypt.compare(inputPassword, hashedPassword);
    return isVerified;
  },
};

module.exports = passwordUtil;
