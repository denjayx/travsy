const PackageService = require('../services/PackageService');

const getPackagesByUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const service = PackageService.getInstance();
    const result = await service.getPackageByUsername(username);

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

module.exports = getPackagesByUserController;
