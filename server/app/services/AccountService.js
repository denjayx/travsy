const { Transaction } = require('sequelize');
const { Account, sequelize } = require('../models');

class AccountService {
  static getInstance() {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }

    return AccountService.instance;
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
