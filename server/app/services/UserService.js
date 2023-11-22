const { Transaction } = require('sequelize');
const { User, sequelize } = require('../models');

class UserService {
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async getUserByUsername(username) {
    const findUserWithAccount = async (transaction) => {
      const user = await User.findByPk(username, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
        transaction,
      });
      const account = await user.getAccount({
        attributes: ['email'],
        transaction,
      });

      return { account, user };
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findUserWithAccount(transaction),
    );

    return result;
  }

  async modifyUser(username, data) {
    const updateData = async (transaction) => {
      const user = await User.findByPk(username, { transaction });
      await user.update(data, { transaction });
    };

    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => updateData(transaction),
    );
  }
}

module.exports = UserService;
