const Joi = require('joi');
const PackageService = require('../services/PackageService');
const BadRequestError = require('../errors/BadRequestError');

const getPopularPackageListController = async (req, res, next) => {
  const { limit } = req.query;

  try {
    const querySchema = Joi.object({ limit: Joi.number() });

    const { error, value } = querySchema.validate({ limit });

    if (error) {
      throw new BadRequestError('Limit must be a number');
    }

    const packageService = PackageService.getInstance();
    const packageList = await packageService.getPopularPackageList(value.limit);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the popular tour package list',
      data: packageList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getPopularPackageListController;
