const BaseService = require('./BaseService');
const { Account } = require('../models');
const BaseResponseError = require('../errors/BaseResponseError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

/**
 * Service for managing user accounts.
 * @extends BaseService
 */
class AccountService extends BaseService {
  /**
   * Get an instance of the AccountService using the Singleton pattern.
   * @returns {AccountService} The singleton instance of AccountService.
   */
  static getInstance() {
    if (!AccountService.INSTANCE) {
      AccountService.INSTANCE = new AccountService();
    }

    return AccountService.INSTANCE;
  }

  /**
   * Get a user account by email with specified attributes.
   * @param {string} email - The email associated with the user account.
   * @param {string[]} attributes - The attributes to retrieve for the account.
   * @returns {Object} The user account with specified attributes.
   * @throws {NotFoundError} If the email is not associated with any account.
   * @throws {ServerError} If an unexpected error occurs during the retrieval.
   */
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
