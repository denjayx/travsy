const { Op } = require('sequelize');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const BaseService = require('./BaseService');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BaseResponseError = require('../errors/BaseResponseError');
const {
  PAYMENT_API_ENDPOINT,
  PAYMENT_API_KEY,
} = require('../../config/payment');
const { Transaction: TransactionModel, User, Package } = require('../models');

class TransactionService extends BaseService {
  static getInstance() {
    if (!TransactionService.INSTANCE) {
      TransactionService.INSTANCE = new TransactionService();
    }

    return TransactionService.INSTANCE;
  }

  async createTransaction(username, packageId, transactionData) {
    const { startDate, endDate, totalPerson, totalPrice } = transactionData;

    const createPaymentToken = async (transactionId, customerData) => {
      const { firstName, lastName, phone } = customerData;

      const response = await axios.post(
        PAYMENT_API_ENDPOINT,
        {
          transaction_details: {
            order_id: transactionId,
            gross_amount: totalPrice,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: firstName,
            last_name: lastName,
            phone,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization:
              'Basic ' + Buffer.from(PAYMENT_API_KEY).toString('base64'),
          },
        },
      );

      return response.data.token;
    };

    const insertData = async (transaction) => {
      const transactionId = uuidv4();

      try {
        const user = await User.findByPk(username, {
          attributes: ['firstName', 'lastName', 'phone'],
          transaction,
        });

        if (!user) {
          throw new NotFoundError('User not found');
        }

        const token = await createPaymentToken(transactionId, user);

        await TransactionModel.create(
          {
            packageId,
            touristId: username,
            startDate,
            endDate,
            totalPerson,
            totalPrice,
          },
          { transaction },
        );

        return token;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const token = await this.createDbTransaction(insertData);

    return token;
  }

  // get semua order
  async getOrderList(username) {
    const findOrderList = async (transaction) => {
      try {
        const tourPackageList = await Package.findAll({
          where: { tourGuideId: username },
          attributes: ['id'],
          transaction,
        });

        const packageIdList = await tourPackageList.map(
          (tourPackage) => tourPackage.id,
        );

        const orderList = await TransactionModel.findAll({
          where: { packageId: { [Op.in]: packageIdList } },
          include: {
            model: Package,
            attributes: ['id', 'packageName'],
          },
          attributes: ['id', 'packageId', 'touristId', 'status', 'orderDate'],
          transaction,
        });

        const mappedOrderList = await Promise.all(
          orderList.map(async (order) => {
            const tourist = await order.getUser({
              attributes: ['avatarUrl', 'firstName', 'lastName'],
              transaction,
            });

            const mappedOrder = {
              tourist,
              transaction: order,
            };

            return mappedOrder;
          }),
        );

        return mappedOrderList;
      } catch (error) {
        console.error(error);
        throw new ServerError();
      }
    };

    const orderList = await this.createDbTransaction(findOrderList);

    return orderList;
  }

  // get order berdasarkan id
  async getDetailOrder(username, id) {
    const findOrderList = async (transaction) => {
      try {
        const order = await TransactionModel.findByPk(id, {
          include: [
            {
              model: Package,
              attributes: ['id', 'packageName'],
            },
            {
              model: User,
              attributes: ['username', 'firstName', 'lastName'],
            },
          ],
          transaction,
        });

        return order;
      } catch (error) {
        console.error(error);
        throw new ServerError();
      }
    };

    const orderList = await this.createDbTransaction(findOrderList);

    return orderList;
  }

  // patch untuk patch order
  async patchOrderForStatus(username, id, status) {
    try {
      console.log(id);
      console.log(status);
      const updatedOrder = await TransactionModel.update(
        { status },
        {
          where: {
            id,
          },
        },
      );

      return updatedOrder;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new ServerError('Gagal memperbarui status pesanan', error);
      }
    }
  }

  // get transaction history by username
  async getHistoryTransactionByUsername(username) {
    try {
      const transactions = await TransactionModel.findAll({
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

  // get detail transaction history by username and id
  async getDetailHistoryTransactionByUsername(username, id) {
    try {
      // Cari transaksi berdasarkan username dan id
      const transaction = await TransactionModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            where: {
              username,
            },
          },
        ],
      });

      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }

      return transaction;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new ServerError('Error fetching transaction details');
      }
    }
  }
}

module.exports = TransactionService;
