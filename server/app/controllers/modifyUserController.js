const UserService = require('../services/UserService');
const AccountService = require('../services/AccountService');

const modifyUserController = async (req, res, next) => {
  const { username } = req.params;
  const { account, user } = req.body;
  const { accountId } = user;

  try {
    const userServiceInstance = UserService.getInstance();
    const accountServiceInstance = AccountService.getInstance();

    await userServiceInstance.modifyUser(username, user);
    await accountServiceInstance.modifyAccount(accountId, account);

    const updatedData = await userServiceInstance.getUserByUsername(username);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil memperbarui data user',
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { modifyUserController };
