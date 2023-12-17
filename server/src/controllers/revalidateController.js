const AuthenticationService = require('../services/AuthenticationService');

const revalidateController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const authenticationService = AuthenticationService.getInstance();
    const credential =
      await authenticationService.revalidateCredential(username);

    res.status(200).json({
      status: 'OK',
      mesage: 'Successfully revalidate the credential',
      data: credential,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = revalidateController;
