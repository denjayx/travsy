const { Op } = require('sequelize');
const BaseService = require('./BaseService');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BaseResponseError = require('../errors/BaseResponseError');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
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
            const tourist = await order.getTourist({
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
        throw new ServerError();
      }
    };

    const orderList = await this.createDbTransaction(findOrderList);

    return orderList;
  }

  async getDetailOrder(username, id) {}

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
}

module.exports = TransactionService;
