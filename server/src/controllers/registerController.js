const Joi = require('joi');
const AuthenticationService = require('../services/AuthenticationService');
const BadRequestError = require('../errors/BadRequestError');

const registerController = async (req, res, next) => {
  const registrationData = req.body;

  try {
    const registrationDataSchema = Joi.object({
      account: Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email cannot be empty',
          }),

        password: Joi.string()
          .min(5)
          .max(25)
          .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          )
          .messages({
            'string.pattern.base':
              'Password must be 5-25 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character',
            'string.empty': 'Password cannot be empty',
          }),

        role: Joi.string().valid('tourist', 'tour guide').messages({
          'any.only': 'Role must be either "tourist" or "tour guide"',
        }),
      }),
      user: Joi.object({
        username: Joi.string()
          .pattern(/^[a-z0-9_]+$/)
          .max(15)
          .messages({
            'string.pattern.base':
              'Username should only contain lowercase letters, numbers, and underscores',
            'string.max':
              'Username must be less than or equal to 15 characters',
            'string.empty': 'Username cannot be empty',
          }),
      }),
    });

    const { error, value } = registrationDataSchema.validate(registrationData);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const authenticationService = AuthenticationService.getInstance();
    await authenticationService.registerUserAccount(value);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully registered an account',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerController;
