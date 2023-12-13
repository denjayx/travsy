const TransactionService = require('../services/TransactionService');

const patchOrderStatusController = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const transactionService = TransactionService.getInstance();
    const order = await transactionService.patchOrderStatus(id, status);

    res.status(200).json({
      status: 'OK',
      message: `Successfully patch order status to "${status}"`,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchOrderStatusController;
