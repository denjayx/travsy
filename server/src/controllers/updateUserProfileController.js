const Joi = require('joi');
const UserService = require('../services/UserService');
const BadRequestError = require('../errors/BadRequestError');

const updateUserProfileController = async (req, res, next) => {
  const { username } = req.user;
  const { email, ...user } = req.body;

  try {
    const dataSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Invalid email format',
        }),
      avatarUrl: Joi.string().allow('').uri().messages({
        'string.uri': 'Invalid image URL',
      }),
      firstName: Joi.string().allow('').max(15).messages({
        'string.max':
          'First name must consist maximum of 15 characters without numbers, spaces, or symbols',
      }),
      lastName: Joi.string().allow('').max(15).messages({
        'string.max':
          'Last name must consist maximum of 15 characters without numbers, spaces, or symbols',
      }),
      biography: Joi.string().allow(''),
      nik: Joi.string().allow('').length(16).pattern(/^\d+$/).messages({
        'string.max': 'NIK must consist of 16 digits',
        'string.pattern.base': 'NIK must consist of numbers',
      }),
      phone: Joi.string().allow('').max(13).pattern(/^\d+$/).messages({
        'string.length': 'Phone number must consist maximum of 13 digits',
        'string.pattern.base': 'Phone number must consist of numbers',
      }),
      province: Joi.string().allow(''),
      city: Joi.string().allow(''),
      gender: Joi.string().allow('').valid('L', 'P').messages({
        'any.only': 'Gender must be either L (male) or P (female)',
      }),
    });

    const { error, value } = dataSchema.validate({ email, ...user });

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const userServiceInstance = UserService.getInstance();
    await userServiceInstance.updateUserProfile(username, value);
    const updatedData = await userServiceInstance.getUserProfile(username);

    res.status(200).json({
      status: 'OK',
      message: 'User profile updated successfully',
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserProfileController;
