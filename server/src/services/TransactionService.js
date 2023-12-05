const { Op } = require('sequelize');
const { Transaction, User } = require('../models');
const BaseService = require('./BaseService');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BaseResponseError = require('../errors/BaseResponseError');

class TransactionService extends BaseService {
  // get data history transaction berdasarkan username
  async getHistoryTransactionByUsername(username) {
    try {
      const transactions = await Transaction.findAll({
        where: {
          touristId: username,
        },
        include: [
          {
            model: User,
            attributes: ['username'], // Akan mengambil username dari tabel User
          },
        ],
      });

      if (!transactions || transactions.length === 0) {
        throw new NotFoundError(
          'Tidak ada transaksi ditemukan untuk pengguna ini',
        );
      }

      return transactions;
    } catch (error) {
      console.error(error);
      if (error instanceof BaseResponseError) {
        throw error;
      } else {
        throw new ServerError(
          'Terjadi kesalahan saat mengambil data transaksi',
          error,
        );
      }
    }
  }

  // get detail history transaction berdasarkan username
}

module.exports = TransactionService;
