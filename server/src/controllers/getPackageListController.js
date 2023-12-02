const PackageService = require('../services/PackageService');

const getPackageListController = async (req, res, next) => {
  const filter = req.query;

  try {
    const packageService = PackageService.getInstance();
    const packages = await packageService.getPackageList({
      ...filter,
      pmin: parseInt(filter.pmin, 10),
      pmax: parseInt(filter.pmax, 10),
    });

    // mapping to package with tour guided
    const packageWithTourGuideList = await Promise.all(
      packages.map(async (tourPackage) => {
        const tourGuide = await tourPackage.getTourGuide({
          attributes: ['avatarUrl', 'firstName', 'lastName'],
        });

        return {
          tourGuide,
          package: tourPackage,
        };
      }),
    );

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the tour package list',
      data: packageWithTourGuideList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageListController;
