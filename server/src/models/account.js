const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      this.User = Account.hasOne(models.user, { foreignKey: 'accountId' });
    }
  }
  Account.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        unique: {
          name: 'email',
          msg: 'Email already exist',
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
        values: ['tour guide', 'tourist'],
      },
    },
    {
      sequelize,
      modelName: 'account',
      tableName: 'accounts',
      underscored: true,
      paranoid: true,
    },
  );
  return Account;
};
