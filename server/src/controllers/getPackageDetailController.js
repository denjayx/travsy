const PackageService = require('../services/PackageService');

const getPackageDetailController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const packageService = PackageService.getInstance();

    const packageDetail = await packageService.getPackageDetail(id);

    const tourGuide = await packageDetail.getTourGuide({
      attributes: ['avatarUrl', 'firstName', 'lastName'],
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
