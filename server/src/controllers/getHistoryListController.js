const TransactionService = require('../services/TransactionService');

const getHistoryListController = async (req, res, next) => {
  const { username } = req.user;

  try {
    const transactionService = TransactionService.getInstance();
    const historyList = await transactionService.getHistoryList(username);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got history transactions',
      data: historyList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getHistoryListController;
