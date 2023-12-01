const { ISOLATION_LEVELS } = require('sequelize').Transaction;
const { sequelize } = require('../models');

/**
 * Abstract base class for services providing common functionality.
 * @abstract
 * @class
 */
class BaseService {
  /**
   * Constructor for the BaseService class. It prevents direct instantiation of the abstract class.
   * @constructor
   * @throws {TypeError} Throws a TypeError if the abstract class is instantiated directly.
   */
  constructor() {
    if (this.constructor.name === 'BaseService') {
      throw new TypeError(
        'Abstract class "BaseService" cannot be instantiated directly.',
      );
    }
  }

  /**
   * Creates a database transaction.
   * @abstract
   * @async
   * @param {function} callback - The callback function to be executed within the transaction.
   * @param {ISOLATION_LEVELS} [isolationLevel=ISOLATION_LEVELS.READ_COMMITTED] -
   * The isolation level for the transaction.
   * @returns {Promise<any>} A Promise that resolves with the result of the transaction.
   */
  async createDbTransaction(
    callback,
    isolationLevel = ISOLATION_LEVELS.READ_COMMITTED,
  ) {
    const result = await sequelize.transaction(
      {
        isolationLevel,
      },
      async (transaction) => callback(transaction),
    );

    return result;
  }
}

module.exports = BaseService;
