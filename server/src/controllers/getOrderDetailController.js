const TransactionService = require('../services/TransactionService');

const getOrderDetailController = async (req, res, next) => {
  const { id: transactionId } = req.params;

  try {
    const transactionService = TransactionService.getInstance();
    const order = await transactionService.getOrderDetail(transactionId);

    res.status(200).json({
      status: 'OK',
      message: 'Successfully got the order detail',
      data: order,
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

module.exports = getOrderDetailController;
