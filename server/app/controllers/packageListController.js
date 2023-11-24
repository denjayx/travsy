const PackageService = require('../services/PackageService');

const packageListController = async (req, res, next) => {
  try {
    const filter = req.query;
    const service = PackageService.getInstance();
    const resultPackageList = await service.getPackageList(filter);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan daftar paket wisata',
      data: resultPackageList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = packageListController;
