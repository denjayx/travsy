const bcrypt = require('bcrypt');

/**
 * Asynchronously generates a bcrypt hash for the provided data with a given number of salt rounds.
 *
 * @param {string} data - The data to be hashed.
 * @param {number} saltRounds - The number of salt rounds for bcrypt.
 * @returns {Promise<string>} - A promise that resolves with the generated bcrypt hash.
 *
 * @throws {Error} Throws an error if there is an issue generating the salt or hash.
 *
 * @example
 * // Generating a bcrypt hash with 10 salt rounds
 * const hashedResult = await bcryotHash('password123', 10);
 * console.log(hashedResult);
 */
const bcryptHash = async (data, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

module.exports = bcryptHash;
