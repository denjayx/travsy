const PackageService = require('../services/PackageService');

const insertPackageByUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { newPackage } = req.body;

    const service = PackageService.getInstance();
    const result = await service.createPackageByUser(username, newPackage);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil dibuat',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = insertPackageByUserController;
