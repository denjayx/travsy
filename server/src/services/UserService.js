const { ValidationError } = require('sequelize');
const BaseService = require('./BaseService');
const { user, account } = require('../models');
const BaseResponseError = require('../errors/BaseResponseError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

class UserService extends BaseService {
  static getInstance() {
    if (!UserService.INSTANCE) {
      UserService.INSTANCE = new UserService();
    }

    return UserService.INSTANCE;
  }

  async getUserProfile(username) {
    const findUserIncludeAccount = async (transaction) => {
      try {
        const userProfile = await user.findByPk(username, {
          attributes: [
            'username',
            'avatarUrl',
            'firstName',
            'lastName',
            'biography',
            'nik',
            'phone',
            'province',
            'city',
            'gender',
          ],
          include: {
            model: account,
            attributes: ['email'],
          },
          transaction,
        });

        if (!userProfile) {
          throw new NotFoundError('User not found');
        }

        return {
          username: userProfile.username,
          email: userProfile.account.email,
          avatarUrl: userProfile.avatarUrl,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          biography: userProfile.biography,
          nik: userProfile.nik,
          phone: userProfile.phone,
          province: userProfile.province,
          city: userProfile.city,
          gender: userProfile.gender,
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

  async updateUserProfile(username, profileData) {
    const updateData = async (transaction) => {
      try {
        const { email, ...userData } = profileData;

        const affectedCount = await user.update(userData, {
          where: { username },
          transaction,
        });

        if (!affectedCount[0]) {
          throw new NotFoundError('User not found');
        }

        const userUpdated = await user.findByPk(username, {
          attributes: ['accountId'],
          transaction,
        });

        await account.update(
          { email },
          {
            where: { id: userUpdated.accountId },
            transaction,
          },
        );
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
