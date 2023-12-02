const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { Account, User } = require('../models');
const passwordUtil = require('../utils/passwordUtil');
const AccountService = require('./AccountService');
const BaseResponseError = require('../errors/BaseResponseError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');

/**
 * Service for user authentication and account management.
 * @extends BaseService
 */
class AuthenticationService extends BaseService {
  /**
   * Get an instance of the AuthenticationService using the Singleton pattern.
   * @returns {AuthenticationService} The singleton instance of AuthenticationService.
   */
  static getInstance() {
    if (!AuthenticationService.INSTANCE) {
      AuthenticationService.INSTANCE = new AuthenticationService();
    }

    return AuthenticationService.INSTANCE;
  }

  /**
   * Register a new user account with associated account and user details.
   * @param {Object} account - The account details.
   * @param {Object} user - The user details.
   * @throws {BadRequestError} If the account is already registered.
   * @throws {ServerError} If an unexpected error occurs during registration.
   */
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

  /**
   * Verify the authenticity of a user account based on email and password.
   * @param {string} email - The email associated with the user account.
   * @param {string} password - The password to verify.
   * @returns {Object} The authenticated user account.
   * @throws {BadRequestError} If email or password is missing.
   * @throws {UnauthorizedError} If the password is incorrect.
   * @throws {ServerError} If an unexpected error occurs during verification.
   */
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
