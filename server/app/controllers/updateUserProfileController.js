const UserService = require('../services/UserService');

const updateUserProfileController = async (req, res, next) => {
  const { username } = req.user;
  const { account, user } = req.body;

  try {
    const userServiceInstance = UserService.getInstance();
    await userServiceInstance.updateUserProfile(username, user, account);
    const updatedData = await userServiceInstance.getUserProfile(username);

    res.status(200).json({
      status: 'OK',
      message: 'User profile updated successfully',
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserProfileController;
