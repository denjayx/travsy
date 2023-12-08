const ForbiddenError = require('../errors/ForbiddenError');
const PackageService = require('../services/PackageService');

const getPackageDetailByUserController = async (req, res, next) => {
  const { username } = req.user;
  const { id } = req.params;

  try {
    const packageService = PackageService.getInstance();
    const packageDetail = await packageService.getPackageDetail(id);

    if (packageDetail.tourGuideId !== username) {
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

module.exports = getPackageDetailByUserController;
