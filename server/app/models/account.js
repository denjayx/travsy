'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.User = Account.hasOne(models.User, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'accountId',
          allowNull: false,
        },
      });
    }
  }
  Account.init(
    {
      accountId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email already exists',
        },
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['tourGuide', 'tourist'],
      },
    },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'accounts',
      underscored: true,
      paranoid: true,
    },
  );
  return Account;
};
