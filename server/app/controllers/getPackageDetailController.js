const PackageService = require('../services/PackageService');

// Desc: controller for get package detail
const getPackageDetailController = async (req, res, next) => {
  try {
    const { packageId } = req.params;
    const packageService = PackageService.getInstance();

    const packageDetail = await packageService.getPackageDetail(packageId);

    const tourGuide = await packageDetail.getTourGuide({
      attributes: ['firstName', 'lastName'],
    });

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data detail package',
      data: { tourGuide, package: packageDetail },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageDetailController;
