const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      this.TourGuide = Package.belongsTo(models.user, {
        foreignKey: 'tourGuideId',
        as: 'tourGuide',
      });
      this.Transactions = Package.hasMany(models.transaction, {
        foreignKey: 'packageId',
      });
      this.Destinations = Package.hasMany(models.destination, {
        foreignKey: 'packageId',
      });
    }
  }
  Package.init(
    {
      id: {
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
        type: DataTypes.STRING(50),
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
      destinationCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      transactionCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'package',
      tableName: 'packages',
      underscored: true,
      paranoid: true,
    },
  );
  return Package;
};
