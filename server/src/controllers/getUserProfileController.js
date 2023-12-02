const UserService = require('../services/UserService');

const getUserProfileController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const userService = UserService.getInstance();
    const userProfile = await userService.getUserProfile(username);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully obtained user profile',
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserProfileController;
