const PackageService = require('../services/PackageService');

const getUserPackageListController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const packageService = PackageService.getInstance();
    const packages = await packageService.getUserPackageList(username);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the tour guide tour package list',
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserPackageListController;
