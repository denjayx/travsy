const Joi = require('joi');
const TransactionService = require('../services/TransactionService');
const BadRequestError = require('../errors/BadRequestError');

const createTransactionController = async (req, res, next) => {
  const { username } = req.user;
  const { id: packageId } = req.params;
  const transactionData = req.body;

  try {
    const transactionDataSchema = Joi.object({
      startDate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"sdate" must be in YYYY-MM-DD format',
          'string.empty': 'Start date connot be empty',
        }),
      endDate: Joi.string()
        .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
        .messages({
          'string.pattern.base': '"edate" must be in YYYY-MM-DD format',
          'string.empty': 'End date connot be empty',
        }),
      totalPerson: Joi.number().messages({
        'number.empty': 'Total person cannot be empty',
      }),
      totalPrice: Joi.number().messages({
        'number.empty': 'Total price cannot be empty',
      }),
    });

    const { error, value } = transactionDataSchema.validate(transactionData);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const transactionService = TransactionService.getInstance();
    const token = await transactionService.createTransaction(
      username,
      packageId,
      value,
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
