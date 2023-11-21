const { Op } = require('sequelize');
const DatabaseService = require('./DatabaseService');
const { Package } = require('../models');

class PackageService extends DatabaseService {
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

    const { search = '', pmin = 0, pmax = 0 } = filter;

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
      const packages = await Package.findAll(
        {
          where: {
            [Op.and]: whereClauses,
          },
        },
        { transaction },
      );

      return packages;
    };

    const result = await this.doTransaction(
      findPackagesWithFilters,
      'READ_COMMITTED',
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
