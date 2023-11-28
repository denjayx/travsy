const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccountService = require('../services/AccountService');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { jwtSecret } = require('../../config/security');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const accountService = await AccountService.getInstance();

    if (!(password && email)) {
      throw new BadRequestError('Email dan password harap diisi');
    }

    const account = await accountService.getAccountByEmail(email);

    if (!(await bcrypt.compare(password, account.password))) {
      throw new UnauthorizedError('Password salah');
    }

    const user = await account.getUser({
      attributes: ['avatarUrl', 'firstName', 'lastName'],
    });

    const token = jwt.sign(
      {
        username: user.username,
      },
      jwtSecret,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      },
    );

    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
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
