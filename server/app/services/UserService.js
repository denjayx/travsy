const { Transaction } = require('sequelize');
const { User, sequelize } = require('../models');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

class UserService {
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async insertUser(data) {
    const createUser = async (transaction) => {
      try {
        const user = await User.create(data, {
          transaction,
        });

        return user;
      } catch (error) {
        throw new ServerError();
      }
    };

    const user = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => createUser(transaction),
    );

    return user;
  }

  async getUserByUsername(username) {
    const findUserWithAccount = async (transaction) => {
      try {
        const user = await User.findByPk(username, {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          transaction,
        });

        if (!user) {
          throw new NotFoundError('User tidak ditemukan');
        }

        const account = await user.getAccount({
          attributes: ['email'],
          transaction,
        });

        return { account, user };
      } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findUserWithAccount(transaction),
    );

    return result;
  }

  async modifyUser(username, data) {
    const updateData = async (transaction) => {
      try {
        const user = await User.findByPk(username, { transaction });
        if (user === undefined) {
          throw new NotFoundError('User tidak ditemukan');
        }
        await user.update(data, { transaction });
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

module.exports = UserService;
