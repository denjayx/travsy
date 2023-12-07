const PackageService = require('../services/PackageService');

const getPackageListByUserController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const packageService = PackageService.getInstance();
    const packages = await packageService.getPackageListByUsername(username);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the tour guide tour package list',
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageListByUserController;
