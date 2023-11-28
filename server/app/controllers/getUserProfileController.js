const UserService = require('../services/UserService');

// Desc: controller for get user by username
const getUserProfileController = async (req, res, next) => {
  try {
    const { username } = req.user;
    const userService = UserService.getInstance();
    const { account, user } = await userService.getUserByUsername(username);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data user',
      data: { account, user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserProfileController;
