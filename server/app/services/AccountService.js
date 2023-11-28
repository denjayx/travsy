const { Transaction, ValidationError } = require('sequelize');
const { Account, User, sequelize } = require('../models');
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

  // Desc: service for get account by email
  async getAccountByEmail(email) {
    const findAccount = async (transaction) => {
      try {
        const account = await Account.findOne({
          where: { email },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          transaction,
        });

        if (!account) {
          throw new NotFoundError('Akun tidak ditemukan');
        }

        return account;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const account = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findAccount(transaction),
    );

    return account;
  }

  // Desc: service for create new account include user
  async createAccountIncludeUser(dataAccount, dataUser) {
    const insertData = async (transaction) => {
      try {
        await Account.create(
          { ...dataAccount, User: dataUser },
          {
            include: User,
            transaction,
          },
        );
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new BadRequestError('Akun sudah terdaftar');
        }
        throw new ServerError();
      }
    };

    await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => insertData(transaction),
    );
  }
}

module.exports = AccountService;
