const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      this.Packages = Destination.belongsTo(models.Package, {
        foreignKey: 'packageId',
      });
      Destination.addHook('afterCreate', async (destination, options) => {
        const tourPackage = await models.Package.findByPk(
          destination.packageId,
          { transaction: options.transaction },
        );
        tourPackage.destinationCount += 1;
        tourPackage.save({ transaction: options.transaction });
      });
    }
  }
  Destination.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      packageId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      destinationName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Destination',
      tableName: 'destinations',
      underscored: true,
      paranoid: true,
    },
  );
  return Destination;
};
