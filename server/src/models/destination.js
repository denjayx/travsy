const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      this.Packages = Destination.belongsTo(models.package, {
        foreignKey: 'packageId',
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
      modelName: 'destination',
      tableName: 'destinations',
      underscored: true,
      paranoid: true,
    },
  );
  return Destination;
};
