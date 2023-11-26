const { Transaction, ValidationError } = require('sequelize');
const { Account, sequelize } = require('../models');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

class AccountService {
  // Desc: Implementasi singleton
  static getInstance() {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }

    return AccountService.instance;
  }

  // Desc: service for create new account
  async insertAccount(data) {
    const createAccount = async (transaction) => {
      try {
        const account = await Account.create(data, {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          transaction,
        });

        return account;
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new BadRequestError(error.message);
        }
        throw new ServerError();
      }
    };

    const account = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => createAccount(transaction),
    );

    return account;
  }

  // Desc: service for modify account
  async modifyAccount(accountId, data) {
    const updateData = async (transaction) => {
      try {
        const account = await Account.findByPk(accountId, { transaction });
        if (!account) {
          throw new NotFoundError('User tidak ditemukan');
        }
        await account.update(data, { transaction });
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

module.exports = AccountService;
