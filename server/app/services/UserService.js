const { Transaction } = require('sequelize');
const { User: UserModel, Account, sequelize } = require('../models');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

class UserService {
  // Desc: Implementasi singleton
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  // Desc: service for get user by username
  async getUserByUsername(username) {
    const findUserWithAccount = async (transaction) => {
      try {
        const userAndAccount = await UserModel.findByPk(username, {
          attributes: {
            exclude: ['accountId', 'createdAt', 'updatedAt', 'deletedAt'],
          },
          include: {
            model: Account,
            attributes: ['email'],
          },
          transaction,
        });

        if (!userAndAccount) {
          throw new NotFoundError('User tidak ditemukan');
        }

        return userAndAccount;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const { Account: AccountResult, ...User } = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) =>
        (await findUserWithAccount(transaction)).dataValues,
    );

    return { account: AccountResult, user: User };
  }

  // Desc: service for modify user
  async modifyUserIncludeAccount(username, data, account) {
    const updateData = async (transaction) => {
      try {
        const updatedCount = await UserModel.update(
          { ...data, Account: account },
          { where: { username }, transaction },
        );
        if (!updatedCount) {
          throw new NotFoundError('User tidak ditemukan');
        }
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new ServerError();
      }
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
