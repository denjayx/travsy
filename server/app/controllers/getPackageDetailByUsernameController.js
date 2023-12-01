const PackageService = require('../services/PackageService');
const NotFoundError = require('../errors/NotFoundError');

const getPackageDetailByUsernameController = async (req, res, next) => {
  try {
    const { username, id } = req.params;

    const service = PackageService.getInstance();
    const packageDetail = await service.getDetailPackageByUsername(
      username,
      id,
    );

    if (!packageDetail) {
      throw new NotFoundError('Package not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan detail paket',
      data: packageDetail,
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

module.exports = getPackageDetailByUsernameController;
