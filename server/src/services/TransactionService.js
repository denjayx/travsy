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
            attributes: ['packageName'],
            required: true,
          },
          attributes: ['id', 'touristId', 'status', 'orderDate'],
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
              transaction: {
                id: order.id,
                package: order.package,
                status: order.status,
                orderDate: order.orderDate,
              },
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

  // get order berdasarkan id
  async getOrderDetail(id) {
    const findOrderDetail = async (transaction) => {
      try {
        const order = await transactionModel.findByPk(id, {
          include: [
            {
              model: packageModel,
              attributes: ['packageName'],
              required: true,
            },
          ],
          attributes: [
            'id',
            'packageId',
            'touristId',
            'status',
            'orderDate',
            'startDate',
            'endDate',
            'totalPerson',
            'totalPrice',
          ],
          transaction,
        });

        if (!order) {
          throw new NotFoundError('Transaction not found');
        }

        const tourist = await order.getTourist({
          attributes: ['avatarUrl', 'firstName', 'lastName'],
          transaction,
        });

        const mappedOrder = {
          tourist,
          transaction: {
            id: order.id,
            package: order.package,
            status: order.status,
            orderDate: order.orderDate,
            startDate: order.startDate,
            endDate: order.endDate,
            totalPerson: order.totalPerson,
            totalPrice: order.totalPrice,
          },
        };

        return mappedOrder;
      } catch (error) {
        throw new ServerError();
      }
    };

    const mappedOrder = await this.createDbTransaction(findOrderDetail);

    return mappedOrder;
  }

  // patch untuk patch order
  async patchOrderStatus(id, status) {
    const updateStatus = async (transaction) => {
      try {
        const updatedCount = await transactionModel.update(
          { status },
          {
            where: {
              id,
            },
            transaction,
          },
        );

        if (!updatedCount[0]) {
          throw new NotFoundError('Transaction not found');
        }

        const updatedOrder = await transactionModel.findByPk(id, {
          include: [
            {
              model: packageModel,
              attributes: ['packageName'],
              required: true,
            },
          ],
          attributes: [
            'id',
            'touristId',
            'status',
            'orderDate',
            'startDate',
            'endDate',
            'totalPerson',
            'totalPrice',
          ],
          transaction,
        });

        const tourist = await updatedOrder.getTourist({
          attributes: ['avatarUrl', 'firstName', 'lastName'],
          transaction,
        });

        const mappedOrder = {
          tourist,
          transaction: {
            id: updatedOrder.id,
            package: updatedOrder.package,
            status: updatedOrder.status,
            orderDate: updatedOrder.orderDate,
            startDate: updatedOrder.startDate,
            endDate: updatedOrder.endDate,
            totalPerson: updatedOrder.totalPerson,
            totalPrice: updatedOrder.totalPrice,
          },
        };

        return mappedOrder;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        } else {
          throw new ServerError();
        }
      }
    };

    const updatedOrder = await this.createDbTransaction(updateStatus);

    return updatedOrder;
  }

  // get transaction history by username
  async getHistoryList(username) {
    const findHistories = async (transaction) => {
      try {
        const transactions = await transactionModel.findAll({
          where: { touristId: username },
          include: {
            model: packageModel,
            attributes: ['tourGuideId', 'packageName'],
            required: true,
          },
          attributes: ['id', 'status', 'orderDate'],
          transaction,
        });

        const historyList = await Promise.all(
          transactions.map(async (order) => {
            const tourGuide = await user.findByPk(order.package.tourGuideId, {
              attributes: ['avatarUrl', 'firstName', 'lastName'],
              transaction,
            });

            return {
              tourGuide,
              transaction: {
                id: order.id,
                package: {
                  packageName: order.package.packageName,
                },
                status: order.status,
                orderDate: order.orderDate,
              },
            };
          }),
        );

        return historyList;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        } else {
          throw new ServerError();
        }
      }
    };

    const histories = await this.createDbTransaction(findHistories);

    return histories;
  }

  // get detail transaction history by username and id
  async getHistoryDetail(username, id) {
    const findHistoryDetail = async (transaction) => {
      try {
        const order = await transactionModel.findByPk(id, {
          where: { touristId: username },
          include: [
            {
              model: packageModel,
              attributes: ['tourGuideId', 'packageName'],
              required: true,
            },
          ],
          attributes: [
            'id',
            'status',
            'orderDate',
            'startDate',
            'endDate',
            'totalPerson',
            'totalPrice',
          ],
          transaction,
        });

        if (!order) {
          throw new NotFoundError('Transaction not found');
        }

        const tourGuide = await user.findByPk(order.package.tourGuideId, {
          attributes: ['avatarUrl', 'firstName', 'lastName'],
          transaction,
        });

        const history = {
          tourGuide,
          transaction: {
            id: order.id,
            package: {
              packageName: order.package.packageName,
            },
            status: order.status,
            orderDate: order.orderDate,
            startDate: order.startDate,
            endDate: order.endDate,
            totalPerson: order.totalPerson,
            totalPrice: order.totalPrice,
          },
        };

        return history;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        } else {
          throw new ServerError('Error fetching transaction details');
        }
      }
    };

    const history = await this.createDbTransaction(findHistoryDetail);

    return history;
  }
}

module.exports = TransactionService;
