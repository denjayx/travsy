const PackageService = require('../services/PackageService');

const createPackageByUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const packageData = req.body;
    console.log(packageData);

    const service = PackageService.getInstance();
    const result = await service.createPackageByUser(username, packageData);

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

module.exports = createPackageByUserController;
