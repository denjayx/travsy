const Joi = require('joi');
const TransactionService = require('../services/TransactionService');
const BadRequestError = require('../errors/BadRequestError');

const patchOrderStatusController = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const statusSchema = Joi.string()
      .valid('menunggu', 'terkonfirmasi', 'ditolak', 'selesai')
      .messages({
        'string.empty': 'Status cannot be empty',
        'any.only':
          'Status must be either "menunggu", "terkonfirmasi", "ditolak", or "selesai"',
      });

    const { error, value } = statusSchema.validate(status);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const transactionService = TransactionService.getInstance();
    const order = await transactionService.patchOrderStatus(id, value);

    res.status(200).json({
      status: 'OK',
      message: `Successfully patch order status to "${value}"`,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = patchOrderStatusController;
