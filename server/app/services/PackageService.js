const DatabaseService = require('./DatabaseService');
const { Op } = require('sequelize');
const { Package, Destination, City } = require('../models');

class PackageService extends DatabaseService {
  // menggunakan username
  static async getPackageList(filter) {
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

    const {
      search = '',
      city = '',
      pmin = '',
      pmax = '',
      ndest = '',
      sdate = '',
      edate = '',
      sort = '',
    } = filter;

    const getFilteredPackages = async (transaction) => {
      const packages = await Package.findAll({}, { transaction });

      return packages;
    };
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
