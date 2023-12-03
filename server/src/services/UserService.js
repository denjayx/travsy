const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { User, Account } = require('../models');
const BaseResponseError = require('../errors/BaseResponseError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

/**
 * Service for managing user profiles and accounts.
 * @extends BaseService
 */
class UserService extends BaseService {
  /**
   * Get an instance of the UserService using the Singleton pattern.
   * @returns {UserService} The singleton instance of UserService.
   */
  static getInstance() {
    if (!UserService.INSTANCE) {
      UserService.INSTANCE = new UserService();
    }

    return UserService.INSTANCE;
  }

  /**
   * Get the profile of a user, including associated account details.
   * @param {string} username - The username of the user.
   * @returns {Promise<Object>} The user profile, including account information.
   * @throws {NotFoundError} If the user is not found.
   * @throws {ServerError} If an unexpected error occurs during profile retrieval.
   */
  async getUserProfile(username) {
    const findUserIncludeAccount = async (transaction) => {
      try {
        const userProfile = await User.findByPk(username, {
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

        if (!userProfile) {
          throw new NotFoundError('User not found');
        }

        return {
          email: userProfile.Account.email,
          avatarUrl: userProfile.avatarUrl,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          biography: userProfile.biography,
          nik: userProfile.nik,
          phone: userProfile.phone,
          province: userProfile.province,
          city: userProfile.city,
          gender: userProfile.gender,
          cardNumber: userProfile.cardNumber,
        };
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const userProfile = await this.createDbTransaction(findUserIncludeAccount);

    return userProfile;
  }

  /**
   * Update the profile of a user and associated account details.
   * @param {string} username - The username of the user to be updated.
   * @param {Object} user - The updated user profile data.
   * @param {Object} account - The updated account data.
   * @throws {NotFoundError} If the user to be updated is not found.
   * @throws {BadRequestError} If there is a validation error during the update.
   * @throws {ServerError} If an unexpected error occurs during the update.
   */
  async updateUserProfile(username, user, account) {
    const updateData = async (transaction) => {
      try {
        const affectedCount = await User.update(user, {
          where: { username },
          transaction,
        });

        if (!affectedCount[0]) {
          throw new NotFoundError('User not found');
        }

        const userUpdated = await User.findByPk(username, { transaction });

        await Account.update(account, {
          where: { id: userUpdated.accountId },
          transaction,
        });
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        } else if (error instanceof ValidationError) {
          throw new BadRequestError(error.message);
        } else {
          throw new ServerError();
        }
      }
    };

    await this.createDbTransaction(updateData);
  }
}

module.exports = UserService;
