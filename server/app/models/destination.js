const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.PackageDetails = Destination.hasMany(models.PackageDetail, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'destinationId',
          allowNull: false,
        },
      });
    }
  }
  Destination.init(
    {
      destinationId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      destinationName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
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
