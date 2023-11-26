const UserService = require('../services/UserService');

// Desc: controller for get user by username
const getUserController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const service = UserService.getInstance();
    const resultUser = await service.getUserByUsername(username);

    res.status(200).json({
      status: 'success',
      message: 'Berhasil mendapatkan data user',
      data: resultUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserController;
