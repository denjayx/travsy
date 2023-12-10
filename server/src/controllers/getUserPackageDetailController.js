const ForbiddenError = require('../errors/ForbiddenError');
const PackageService = require('../services/PackageService');

const getUserPackageDetailController = async (req, res, next) => {
  const { username } = req.user;
  const { id: packageId } = req.params;

  try {
    const packageService = PackageService.getInstance();
    const packageDetail = await packageService.getPackageDetail(packageId);

    if (packageDetail.package.tourGuideId !== username) {
      throw new ForbiddenError();
    }

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the package detail',
      data: packageDetail,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserPackageDetailController;
