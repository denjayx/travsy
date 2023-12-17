const TransactionService = require('../services/TransactionService');

const getOrderListController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const transactionService = TransactionService.getInstance();
    const orderList = await transactionService.getOrderList(username);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the tour order list',
      data: orderList,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getOrderListController;
