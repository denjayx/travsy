const Joi = require('joi');
const PackageService = require('../services/PackageService');
const BadRequestError = require('../errors/BadRequestError');

const getPackageListController = async (req, res, next) => {
  const filter = req.query;

  try {
    const filterSchema = Joi.object({
      search: Joi.string().allow(''),
      city: Joi.string().messages({ 'string.empty': 'City cannot be empty' }),
      pmin: Joi.number().messages({
        'number.empty': 'Minimum price cannot be empty',
      }),
      pmax: Joi.number().messages({
        'number.empty': 'Maximum price cannot be empty',
      }),
      ndest: Joi.number().messages({
        'number.empty': 'Number of destination cannot be empty',
      }),
      sdate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"sdate" must be in YYYY-MM-DD format',
          'string.empty': 'Start date connot be empty',
        }),
      edate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"edate" must be in YYYY-MM-DD format',
          'string.empty': 'End date connot be empty',
        }),
    });

    const { error, value } = filterSchema.validate(filter);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const packageService = PackageService.getInstance();
    const packageList = await packageService.getPackageList(value);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the tour package list',
      data: packageList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPackageListController;
