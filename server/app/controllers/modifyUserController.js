const UserService = require('../services/UserService');

// Desc: controller for modify user
const modifyUserController = async (req, res, next) => {
  const { username } = req.user;
  const { account, user } = req.body;

  try {
    const userServiceInstance = UserService.getInstance();
    await userServiceInstance.modifyUserIncludeAccount(username, user, account);
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

module.exports = modifyUserController;
