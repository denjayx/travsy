const { Model } = require('sequelize');

module.exports = (sequelize) => {
  class PackageDetail extends Model {}
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
