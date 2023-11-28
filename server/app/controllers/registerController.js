const bcrypt = require('bcrypt');
const AccountService = require('../services/AccountService');

// Desc: controller for register
const registerController = async (req, res, next) => {
  const { account, user } = req.body;

  const hashPassword = async (password, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  try {
    const saltRounds = 10;
    account.password = await hashPassword(account.password, saltRounds);

    const accountService = AccountService.getInstance();
    await accountService.createAccountIncludeUser(account, user);

    res.status(201).json({
      status: 'success',
      message: 'Berhasil mendaftarkan akun',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
