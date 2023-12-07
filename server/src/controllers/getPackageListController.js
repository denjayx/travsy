const Joi = require('joi');
const PackageService = require('../services/PackageService');
const BadRequestError = require('../errors/BadRequestError');

const getPackageListController = async (req, res, next) => {
  const filter = req.query;

  try {
    const filterSchema = Joi.object({
      search: Joi.string().allow(''),
      city: Joi.string().allow(''),
      pmin: Joi.number(),
      pmax: Joi.number(),
      ndest: Joi.number(),
      sdate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"sdate" must be in YYYY-MM-DD format',
        }),
      edate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"edate" must be in YYYY-MM-DD format',
        }),
    });

    const { error, value } = filterSchema.validate(filter);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const packageService = PackageService.getInstance();
    const packages = await packageService.getPackageList(value);

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
