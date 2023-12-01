const bcryptHash = require('../utils/bcryptHash');
const AccountService = require('../services/AccountService');

// Desc: controller for register
const registerController = async (req, res, next) => {
  const { account, user } = req.body;

  try {
    const saltRounds = 10;
    account.password = await bcryptHash(account.password, saltRounds);

    const accountService = AccountService.getInstance();
    await accountService.createAccountIncludeUser(account, user);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully registered an account',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
