const { Transaction } = require('sequelize');
const { Account, sequelize } = require('../models');

class AccountService {
  static getInstance() {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }

    return AccountService.instance;
  }

  async insertAccount(data) {
    const createAccount = async (transaction) => {
      const account = await Account.create(data, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
        transaction,
      });

      return account;
    };

    const account = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => createAccount(transaction),
    );

    return account;
  }

  async modifyAccount(accountId, data) {
    const updateData = async (transaction) => {
      const account = await Account.findByPk(accountId, { transaction });
      await account.update(data, { transaction });
    };

    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => updateData(transaction),
    );
  }
}

module.exports = AccountService;
