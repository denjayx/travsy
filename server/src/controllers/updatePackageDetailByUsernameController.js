const PackageService = require('../services/PackageService');
const NotFoundError = require('../errors/NotFoundError');

const updatePackageDetailByUsernameController = async (req, res, next) => {
  try {
    const { username, id } = req.params;
    const updatedPackageData = req.body;

    const service = PackageService.getInstance();
    const updatedPackage = await service.updateDetailPackageByUsername(
      username,
      id,
      updatedPackageData,
    );

    if (!updatedPackage) {
      throw new NotFoundError('Package not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui detail paket',
      data: updatedPackage,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message,
      });
    } else {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
    }
    next(error);
  }
};

module.exports = updatePackageDetailByUsernameController;
