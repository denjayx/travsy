const { Op, Transaction } = require('sequelize');
const {
  Package,
  Transaction: TransactionModel,
  sequelize,
} = require('../models');

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

  static async insertPackage(filter) {}

  static async getPackageDetails(id) {
    try {
      const result = await PackageDetails.findOne({ where: { id } });
      return result;
    } catch (error) {
      // Handle error
      console.error('Error fetching package details:', error);
      throw new Error('Failed to fetch package details');
    }
  }

  static async modifyPackage(filter) {}

  static async deletePackage(filter) {}
}

module.exports = PackageService;
