const { Transaction } = require('sequelize');
const { sequelize } = require('../models');

// Desc: Abstract class for database service
class DatabaseService {
  constructor() {
    if (this.constructor.name === 'DatabaseService') {
      throw new TypeError(
        'Abstract class "DatabaseService" cannot be instantiated directly.',
      );
    }
  }

  // Desc: Do transaction with given isolation level
  async #doTransaction(callback, isolationLevel) {
    if (
      ![
        'READ_UNCOMMITTED',
        'READ_COMMITTED',
        'REPEATABLE_READ',
        'SERIALIZABLE',
      ].includes(isolationLevel)
    ) {
      throw new Error('Invalid isolation level');
    }

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS[isolationLevel],
      },

      async (transaction) => {
        const callbackResult = await callback(transaction);
        return callbackResult;
      },
    );

    return result;
  }
}

module.exports = DatabaseService;
