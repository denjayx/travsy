const Joi = require('joi');
const AuthenticationService = require('../services/AuthenticationService');
const BadRequestError = require('../errors/BadRequestError');

const loginController = async (req, res, next) => {
  const loginData = req.body;

  try {
    const loginDataSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Invalid email format',
          'string.empty': 'Email cannot be empty',
        }),
      password: Joi.string().messages({
        'string.empty': 'Password cannot be empty',
      }),
    });

    const { error, value } = loginDataSchema.validate(loginData);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const authenticationService = AuthenticationService.getInstance();
    const credential = await authenticationService.verifyAccount(value);

    res.status(200).json({
      status: 'OK',
      message: 'Login success',
      data: credential,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
