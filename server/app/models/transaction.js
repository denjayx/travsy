const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Package = Transaction.belongsTo(models.Package, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'packageId',
          allowNull: false,
        },
      });
      this.Tourist = Transaction.belongsTo(models.User, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
        foreignKey: {
          name: 'touristId',
          allowNull: false,
        },
      });
    }
  }
  Transaction.init(
    {
      transactionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      packageId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      touristId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['menunggu', 'terkonfirmasi', 'ditolak', 'selesai'],
      },
      orderDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      totalPerson: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      underscored: true,
      paranoid: true,
    },
  );
  return Transaction;
};
