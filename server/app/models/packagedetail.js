const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PackageDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Destination = PackageDetail.belongsTo(models.Destination, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'destinationId',
          allowNull: false,
        },
      });
      this.Package = PackageDetail.belongsTo(models.Package, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'packageId',
          allowNull: false,
        },
      });
    }
  }
  PackageDetail.init(
    {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      destinationId: {
        allowNull: false,
        primaryKey: true,
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
