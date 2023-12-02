const BaseService = require('./BaseService');
const { Account } = require('../models');
const BaseResponseError = require('../errors/BaseResponseError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

class AccountService extends BaseService {
  static getInstance() {
    if (!AccountService.INSTANCE) {
      AccountService.INSTANCE = new AccountService();
    }

    return AccountService.INSTANCE;
  }

  async getAccountByEmail(email, attributes) {
    const findAccount = async (transaction) => {
      try {
        const account = await Account.findOne({
          where: { email },
          attributes,
          transaction,
        });

        if (!account) {
          throw new NotFoundError('Email not found');
        }

        return account;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const account = await this.createDbTransaction(findAccount);

    return account;
  }
}

module.exports = AccountService;
