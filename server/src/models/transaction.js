const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.Package = Transaction.belongsTo(models.Package, {
        foreignKey: 'packageId',
      });
      this.Tourist = Transaction.belongsTo(models.User, {
        foreignKey: 'touristId',
        as: 'Tourist',
      });
      Transaction.addHook('afterCreate', async (transaction, options) => {
        const tourPackage = await models.Package.findByPk(
          transaction.packageId,
          { transaction: options.transaction },
        );
        tourPackage.transactionCount += 1;
        await tourPackage.save({ transaction: options.transaction });
      });
    }
  }
  Transaction.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'transaction_id',
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
        defaultValue: 'menunggu',
      },
      orderDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: new Date().toISOString().split('T')[0],
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
