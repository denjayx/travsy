const TransactionService = require('../services/TransactionService');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const getTransactionHistoriesController = async (req, res, next) => {
  const { username } = req.params;

  try {
    const transactionService = new TransactionService();
    const transactions =
      await transactionService.getHistoryTransactionByUsername(username);

    // Handle jika tidak ada transaksi ditemukan
    if (!transactions || transactions.length === 0) {
      throw new NotFoundError(
        'Tidak ada riwayat transaksi ditemukan untuk pengguna ini',
      );
    }

    res.status(200).json({
      status: 'OK',
      message: 'Berhasil mendapatkan riwayat transaksi',
      data: transactions,
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

module.exports = getTransactionHistoriesController;
