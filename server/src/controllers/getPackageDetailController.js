const PackageService = require('../services/PackageService');

const getPackageDetailController = async (req, res, next) => {
  const { id: packageId } = req.params;

  try {
    const packageService = PackageService.getInstance();

    const packageDetail = await packageService.getPackageDetail(packageId);

    const tourGuide = await packageDetail.getTourGuide({
      attributes: ['avatarUrl', 'firstName', 'lastName'],
    });

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the package detail',
      data: { tourGuide, package: packageDetail },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageDetailController;
