const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      this.User = Package.belongsTo(models.User, { foreignKey: 'tourGuideId' });
      this.Transactions = Package.hasMany(models.Transaction, {
        foreignKey: 'packageId',
      });
      this.Destinations = Package.belongsToMany(models.Destination, {
        through: models.PackageDetail,
      });
    }
  }
  Package.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'package_id',
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
      destinationCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      transactionCount: {
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
