const TransactionService = require('../services/TransactionService');

const getHistoryDetailController = async (req, res, next) => {
  const { username } = req.user;
  const { id: transactionId } = req.params;

  try {
    const transactionService = TransactionService.getInstance();
    const historyDetail = await transactionService.getHistoryDetail(
      username,
      transactionId,
    );

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the detail transaction',
      data: historyDetail,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getHistoryDetailController;
