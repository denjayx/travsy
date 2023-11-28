const { Transaction, ValidationError } = require('sequelize');
const { User, Account, sequelize } = require('../models');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

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
        const userAndAccount = await User.findByPk(username, {
          attributes: {
            exclude: [
              'username',
              'accountId',
              'createdAt',
              'updatedAt',
              'deletedAt',
            ],
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

    const { Account: AccountResult, ...UserResult } =
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (transaction) =>
          (await findUserWithAccount(transaction)).dataValues,
      );

    return { account: AccountResult, user: UserResult };
  }

  // Desc: service for modify user
  async modifyUserIncludeAccount(username, userData, accountData) {
    const updateData = async (transaction) => {
      try {
        const affectedCount = await User.update(userData, {
          where: { username },
          transaction,
        });

        if (!affectedCount[0]) {
          throw new NotFoundError('User tidak ditemukan');
        }

        const userUpdated = await User.findByPk(username, { transaction });

        await Account.update(accountData, {
          where: { id: userUpdated.accountId },
          transaction,
        });
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        } else if (error instanceof ValidationError) {
          throw new BadRequestError(error.message);
        } else {
          throw new ServerError();
        }
      }
    };

    const modifiedData = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => updateData(transaction),
    );

    return modifiedData;
  }
}

module.exports = UserService;
