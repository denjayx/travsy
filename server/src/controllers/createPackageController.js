const PackageService = require('../services/PackageService');

const createPackageController = async (req, res, next) => {
  const { username } = req.params;
  const packageData = req.body;

  try {
    const packageService = PackageService.getInstance();
    const result = await packageService.createPackage(username, packageData);

    res.status(200).json({
      status: 'OK',
      message: 'Package successfully created',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPackageController;
