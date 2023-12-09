const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Account = User.belongsTo(models.Account, {
        foreignKey: 'accountId',
      });
      this.Packages = User.hasMany(models.Package, {
        foreignKey: 'tourGuideId',
      });
      this.Transactions = User.hasMany(models.Transaction, {
        foreignKey: 'touristId',
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
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      paranoid: true,
    },
  );
  return User;
};
