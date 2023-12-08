const PackageService = require('../services/PackageService');

const deletePackageController = async (req, res, next) => {
  const { username } = req.user;
  const { id } = req.params;

  try {
    const packageService = PackageService.getInstance();
    await packageService.deletePackage(username, id);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully delete the package',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePackageController;
