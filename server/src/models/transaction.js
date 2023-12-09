const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.Package = Transaction.belongsTo(models.package, {
        foreignKey: 'packageId',
      });
      this.Tourist = Transaction.belongsTo(models.user, {
        foreignKey: 'touristId',
        as: 'tourist',
      });
      Transaction.addHook('afterCreate', async (transaction, options) => {
        const tourPackage = await models.package.findByPk(
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
      modelName: 'transaction',
      tableName: 'transactions',
      underscored: true,
      paranoid: true,
    },
  );
  return Transaction;
};
