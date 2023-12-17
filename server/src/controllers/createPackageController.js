const Joi = require('joi');
const PackageService = require('../services/PackageService');
const BadRequestError = require('../errors/BadRequestError');

const createPackageController = async (req, res, next) => {
  const { username } = req.user;
  const packageData = req.body;

  try {
    const packageDataSchema = Joi.object({
      packageName: Joi.string().min(3).max(50).message({
        'string.min': 'package name must be consist of minimum 3 characters',
        'string.max': 'package name must be consist of maximum 50 characters',
      }),
      thumbnailUrl: Joi.string().allow(''),
      price: Joi.number().messages({ 'number.empty': 'Price cannot be empty' }),
      description: Joi.string().allow(''),
      serviceDuration: Joi.number().messages({
        'number.empty': 'Service duration cannot be empty',
      }),
      destinations: Joi.array().items(
        Joi.object({
          destinationName: Joi.string().min(3).max(50).message({
            'string.min':
              'package name must be consist of minimum 3 characters',
            'string.max':
              'package name must be consist of maximum 50 characters',
          }),
          city: Joi.string().messages({
            'string.empty': 'city cannot be empty',
          }),
          description: Joi.string().allow(''),
        }),
      ),
    });

    const { error, value } = packageDataSchema.validate(packageData);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const packageService = PackageService.getInstance();
    await packageService.createPackage(username, value);

    res.status(201).json({
      status: 'OK',
      message: 'Package successfully created',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPackageController;
