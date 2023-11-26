const PackageService = require('../services/PackageService');

const getPopularPackageListController = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const packageService = PackageService.getInstance();
    const packages = await packageService.getPopularPackageList(limit);
    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan daftar paket populer',
      data: packages,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getPopularPackageListController;
