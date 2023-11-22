const PackageService = require('../services/PackageService');

const getPackageDetailController = async (req, res, next) => {
  try {
    const { packageId } = req.params;
    const service = PackageService.getInstance();
    const result = await service.getPackageDetail(packageId);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data detail package',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = getPackageDetailController;
