const TransactionService = require('../services/TransactionService');

const getDetailOrder = async (req, res, next) => {
  const { username, id } = req.params;

  try {
    const transactionService = TransactionService.getInstance();
    const detailOrder = transactionService.getDetailOrder(username, id);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the detail order',
      data: detailOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getDetailOrder;
