const bcrypt = require('bcrypt');
const AccountService = require('../services/AccountService');
const UserService = require('../services/UserService');

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

    const accountServiceInstance = AccountService.getInstance();
    const userServiceInstance = UserService.getInstance();

    const createdAccount = await accountServiceInstance.insertAccount(account);
    await userServiceInstance.insertUser({
      ...user,
      accountId: createdAccount.id,
    });

    res.status(201).json({
      status: 'success',
      message: 'Berhasil mendaftarkan akun',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
