const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { Account, User } = require('../models');
const passwordUtil = require('../utils/passwordUtil');
const AccountService = require('./AccountService');
const BaseResponseError = require('../errors/BaseResponseError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');

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

  async verifyAccount(email, password) {
    try {
      if (!(password && email)) {
        throw new BadRequestError('Email and password required');
      }

      const accountService = AccountService.getInstance();
      const account = await accountService.getAccountByEmail(email, [
        'id',
        'password',
        'role',
      ]);

      if (!(await passwordUtil.verifyPassword(password, account.password))) {
        throw new UnauthorizedError('Wrong password');
      }

      return account;
    } catch (error) {
      if (error instanceof BaseResponseError) {
        throw error;
      }
      throw new ServerError();
    }
  }
}

module.exports = AuthenticationService;
