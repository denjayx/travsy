const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class PackageDetail extends Model {
    static associate(models) {
      PackageDetail.addHook('afterCreate', async (packageDetail, options) => {
        const tourPackage = await models.Package.findByPk(
          packageDetail.packageId,
          { transaction: options.transaction },
        );
        tourPackage.destinationCount += 1;
        tourPackage.save({ transaction: options.transaction });
      });
    }
  }
  PackageDetail.init(
    {},
    {
      sequelize,
      modelName: 'PackageDetail',
      tableName: 'package_details',
      underscored: true,
      paranoid: true,
      timestamps: false,
    },
  );
  return PackageDetail;
};
