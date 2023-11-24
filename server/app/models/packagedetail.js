const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PackageDetail extends Model {
    static associate(models) {
      this.Destination = PackageDetail.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
      });
      this.Package = PackageDetail.belongsTo(models.Package, {
        foreignKey: 'packageId',
      });
    }
  }
  PackageDetail.init(
    {
      packageId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      destinationId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'PackageDetail',
      tableName: 'package_details',
      underscored: true,
      paranoid: true,
    },
  );
  return PackageDetail;
};
