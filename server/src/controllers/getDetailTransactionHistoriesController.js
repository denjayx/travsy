const TransactionService = require('../services/TransactionService');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const getDetailTransactionHistoriesController = async (req, res, next) => {
  const { username, id } = req.params;

  try {
    const transactionService = new TransactionService();
    const transaction =
      await transactionService.getDetailHistoryTransactionByUsername(
        username,
        id,
      );

    // Handle jika tidak ada transaksi ditemukan
    if (!transaction) {
      throw new NotFoundError(
        'Tidak ada detail transaksi ditemukan untuk pengguna ini dan ID yang diberikan',
      );
    }

    res.status(200).json({
      status: 'OK',
      message: 'Berhasil mendapatkan detail transaksi',
      data: transaction,
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
          'Terjadi kesalahan dalam mengambil detail transaksi',
          error,
        ),
      );
    }
  }
};

module.exports = getDetailTransactionHistoriesController;
