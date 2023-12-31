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
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'accountId',
          allowNull: false,
        },
      });
      this.Packages = User.hasMany(models.Package, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'tourGuideId',
          allowNull: false,
        },
      });
      this.Transactions = User.hasMany(models.Transaction, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'touristId',
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      nik: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
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
      cardNumber: {
        type: DataTypes.STRING,
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
