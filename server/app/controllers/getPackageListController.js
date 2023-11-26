const PackageService = require('../services/PackageService');

// Desc: controller for get package list
const getPackageListController = async (req, res, next) => {
  try {
    const filter = req.query;
    const service = PackageService.getInstance();
    const resultPackageList = await service.getPackageList({
      ...filter,
      pmin: parseInt(filter.pmin, 10),
      pmax: parseInt(filter.pmax, 10),
    });

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan daftar paket wisata',
      data: resultPackageList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageListController;
