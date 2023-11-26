const { Op, Transaction } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  User,
  sequelize,
} = require('../models');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

class PackageService {
  static getInstance() {
    if (!PackageService.instance) {
      PackageService.instance = new PackageService();
    }

    return PackageService.instance;
  }

  async getPackageList(filter) {
    const expectedFilter = [
      'search',
      'city',
      'pmin',
      'pmax',
      'ndest',
      'sdate',
      'edate',
      'sort',
    ];

    Object.keys(filter).forEach((key) => {
      if (!expectedFilter.includes(key)) {
        throw new Error(`Invalid filter key: ${key}`);
      }
    });

    const { search = '', pmin = 0, pmax = 0, sort = '' } = filter;

    const whereClauses = [];

    whereClauses.push({
      packageName: {
        [Op.like]: `%${search}%`,
      },
    });

    if (pmax !== 0) {
      whereClauses.push({
        price: {
          [Op.between]: [pmin, pmax],
        },
      });
    }

    const findPackagesWithFilters = async (transaction) => {
      let packages = await Package.findAll(
        {
          include: [
            {
              model: TransactionModel,
              attributes: ['transactionId'],
              required: true,
            },
          ],
          where: {
            [Op.and]: whereClauses,
          },
        },
        { transaction },
      );

      if (sort !== '') {
        const sortFilter = sort.split(':');

        const sortAscending = () =>
          packages.sort(
            (a, b) => a.Transactions.length - b.Transactions.length,
          );

        const sortDescending = () =>
          packages.sort(
            (a, b) => b.Transactions.length - a.Transactions.length,
          );

        if (sortFilter.length !== 2) {
          throw new Error('Invalid sort filter');
        }

        if (!['popular'].includes(sortFilter[0])) {
          throw new Error('Invalid sort key');
        }

        if (!['asc', 'desc'].includes(sortFilter[1])) {
          throw new Error('Invalid sort order');
        }

        packages = sortFilter[1] === 'asc' ? sortAscending() : sortDescending();
      }

      return packages;
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findPackagesWithFilters(transaction),
    );

    return result;
  }

  // insert data package
  static async insertPackage(filter) {}

  // menemkan package berdasarkan username
  async getPackageByUsername(tourGuideId) {
    try {
      const userPackages = await Package.findAll({ where: { tourGuideId } });
      if (!userPackages.length) {
        throw new NotFoundError('Package tidak ditemukan');
      }
      return userPackages;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ServerError();
    }
  }

  // get detail package by id
  static async getPackageDetail(id) {
    const findPackagesById = async (transaction) => {
      try {
        const packageDetail = await Package.findByPk(id, {
          include: [
            {
              model: Destination,
              required: true,
            },
          ],
          transaction,
        });
        return packageDetail;
      } catch (error) {
        // Handle error
        console.error('Error fetching package details:', error);
        throw new Error('Failed to fetch package details');
      }
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findPackagesById(transaction),
    );

    return result;
  }

  static async modifyPackage(filter) {}

  static async deletePackage(filter) {}
}

module.exports = PackageService;
