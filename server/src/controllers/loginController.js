const Joi = require('joi');
const AuthenticationService = require('../services/AuthenticationService');
const tokenUtil = require('../utils/tokenUtil');
const BadRequestError = require('../errors/BadRequestError');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const bodySchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          'string.email': 'Invalid email format.',
          'string.empty': 'Email cannot be empty',
        }),
      password: Joi.string().messages({
        'string.empty': 'Password cannot be empty',
      }),
    });

    const { error, value } = bodySchema.validate({ email, password });

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const authenticationService = AuthenticationService.getInstance();
    const account = await authenticationService.verifyAccount(value);

    // generate token
    const user = await account.getUser({
      attributes: ['username', 'avatarUrl', 'firstName', 'lastName'],
    });
    const token = tokenUtil.generateToken({ username: user.username });

    res.status(200).json({
      status: 'OK',
      message: 'Login success',
      data: {
        token,
        role: account.role,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
