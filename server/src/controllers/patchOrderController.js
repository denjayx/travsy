const TransactionService = require('../services/TransactionService');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const patchOrderController = async (req, res, next) => {
  const { username, id } = req.params;
  const { status } = req.body;

  try {
    const transactionService = new TransactionService();
    const order = await transactionService.patchOrderForStatus(
      username,
      id,
      status,
    );

    if (!order || order.length === 0) {
      throw new NotFoundError('Tidak ada order ditemukan untuk pengguna ini');
    }

    res.status(200).json({
      status: 'OK',
      message: 'Berhasil',
      data: order,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'Not Found',
        message: error.message,
      });
    } else {
      // Handle error lainnya
      next(
        new ServerError(
          'Terjadi kesalahan dalam mengambil riwayat transaksi',
          error,
        ),
      );
    }
  }
};

module.exports = patchOrderController;
