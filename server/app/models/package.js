'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.User = Package.belongsTo(models.User, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'tourGuideId',
          allowNull: false,
        },
      });
      this.PackageDetails = Package.hasMany(models.PackageDetail, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'packageId',
          allowNull: false,
        },
      });
      this.Transactions = Package.hasMany(models.Transaction, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'packageId',
          allowNull: false,
        },
      });
    }
  }
  Package.init(
    {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tourGuideId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      packageName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      thumbnailUrl: {
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      serviceDuration: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Package',
      tableName: 'packages',
      underscored: true,
      paranoid: true,
    },
  );
  return Package;
};
