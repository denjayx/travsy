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
const {
  transaction: transactionModel,
  user,
  package: packageModel,
  account,
} = require('../models');
const ForbiddenError = require('../errors/ForbiddenError');

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
        const userData = await user.findByPk(username, {
          attributes: ['firstName', 'lastName', 'phone', 'accountId'],
          transaction,
        });
        const packageData = await packageModel.findByPk(packageId, {
          attributes: ['id', 'transactionCount'],
          transaction,
        });

        if (!userData) {
          throw new NotFoundError('User not found');
        } else if (!packageData) {
          throw new NotFoundError('Package not found');
        }

        const accountData = await account.findByPk(userData.accountId, {
          attributes: ['role'],
          transaction,
        });

        if (accountData.role !== 'tourist') {
          throw new ForbiddenError(
            'You are logged in as tour guide. To checkout package please login as tourist',
          );
        }

        const token = await createPaymentToken(transactionId, userData);

        await transactionModel.create(
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

        await packageModel.update(
          { transactionCount: packageData.transactionCount + 1 },
          { where: { id: packageData.id }, transaction },
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
        const tourPackageList = await packageModel.findAll({
          where: { tourGuideId: username },
          attributes: ['id'],
          transaction,
        });

        const packageIdList = await tourPackageList.map(
          (tourPackage) => tourPackage.id,
        );

        const orderList = await transactionModel.findAll({
          where: { packageId: { [Op.in]: packageIdList } },
          include: {
            model: packageModel,
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
        const order = await transactionModel.findByPk(id, {
          include: [
            {
              model: packageModel,
              attributes: ['id', 'packageName'],
            },
            {
              model: user,
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
      const updatedOrder = await transactionModel.update(
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
      const transactions = await transactionModel.findAll({
        where: {
          touristId: username,
        },
        include: [
          {
            model: user,
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
      const transaction = await transactionModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: user,
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
