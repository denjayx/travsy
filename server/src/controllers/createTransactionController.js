const TransactionService = require('../services/TransactionService');

const createTransactionController = async (req, res, next) => {
  const { username } = req.user;
  const { id: packageId } = req.params;
  const data = req.body;

  try {
    const transactionService = TransactionService.getInstance();
    const token = await transactionService.createTransaction(
      username,
      packageId,
      {
        ...data,
        totalPerson: parseInt(data.totalPerson, 10),
        totalPrice: parseInt(data.totalPrice, 10),
      },
    );

    res.status(200).json({
      status: 'OK',
      message: 'Transaction success',
      data: {
        paymentToken: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createTransactionController;
