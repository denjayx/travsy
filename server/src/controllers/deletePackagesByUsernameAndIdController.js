const PackageService = require('../services/PackageService');
const NotFoundError = require('../errors/NotFoundError');

const deletePackagesByUsernameAndIdController = async (req, res, next) => {
  try {
    const { username, id } = req.params;

    const service = PackageService.getInstance();
    const result = await service.deletePackagesByUsernameAndId(username, id);

    res.status(200).json({
      status: 'success',
      message: result.message,
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

module.exports = deletePackagesByUsernameAndIdController;
