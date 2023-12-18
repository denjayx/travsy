const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Account = User.belongsTo(models.account, {
        foreignKey: 'accountId',
      });
      this.Packages = User.hasMany(models.package, {
        foreignKey: 'tourGuideId',
        as: 'tourGuide',
      });
      this.Transactions = User.hasMany(models.transaction, {
        foreignKey: 'touristId',
        as: 'tourist',
      });
    }
  }
  User.init(
    {
      username: {
        primaryKey: true,
        type: DataTypes.STRING(15),
      },
      accountId: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
      },
      avatarUrl: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING(15),
      },
      lastName: {
        type: DataTypes.STRING(15),
      },
      biography: {
        type: DataTypes.TEXT,
      },
      nik: {
        type: DataTypes.STRING(16),
      },
      phone: {
        type: DataTypes.STRING(13),
      },
      province: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['L', 'P'],
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'users',
      underscored: true,
      paranoid: true,
    },
  );
  return User;
};
