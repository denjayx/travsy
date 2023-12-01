const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { Account, User } = require('../models');
const passwordUtil = require('../utils/passwordUtil');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');

class AuthenticationService extends BaseService {
  static getInstance() {
    if (!AuthenticationService.INSTANCE) {
      AuthenticationService.INSTANCE = new AuthenticationService();
    }

    return AuthenticationService.INSTANCE;
  }

  async registerUserAccount(account, user) {
    const insertData = async (transaction) => {
      try {
        const hashedPassword = await passwordUtil.hashPassword(
          account.password,
        );

        await Account.create(
          { ...account, password: hashedPassword, User: user },
          {
            include: User,
            transaction,
          },
        );
      } catch (error) {
        if (error instanceof ValidationError) {
          throw new BadRequestError('The account is already registered');
        }
        throw new ServerError();
      }
    };

    await this.createDbTransaction(insertData);
  }
}

module.exports = AuthenticationService;
