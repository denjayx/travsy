const PackageService = require('../services/PackageService');

const getPopularPackageListController = async (req, res, next) => {
  const { limit } = req.query;

  try {
    const packageService = PackageService.getInstance();
    const packages = await packageService.getPopularPackageList(limit);

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
      message: 'Successfully got the popular tour package list',
      data: packageWithTourGuideList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getPopularPackageListController;
