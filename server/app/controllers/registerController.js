const AuthenticationService = require('../services/AuthenticationService');

const registerController = async (req, res, next) => {
  const { account, user } = req.body;

  try {
    const authenticationService = AuthenticationService.getInstance();
    await authenticationService.registerUserAccount(account, user);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully registered an account',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
