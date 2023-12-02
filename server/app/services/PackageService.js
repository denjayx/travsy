const { Op, Transaction } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  User,
  sequelize,
} = require('../models');
const BaseService = require('./BaseService');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

class PackageService extends BaseService {
  // Desc: Implementasi singleton
  static getInstance() {
    if (!PackageService.instance) {
      PackageService.instance = new PackageService();
    }

    return PackageService.instance;
  }

  // Desc: service for get package list with filter
  async getPackageList(filter) {
    const expectedFilter = [
      'search',
      'city',
      'pmin',
      'pmax',
      'ndest',
      'sdate',
      'edate',
    ];

    Object.keys(filter).forEach((key) => {
      if (!expectedFilter.includes(key)) {
        throw new BadRequestError(`Filter ${key} could not be found`);
      }
    });

    const { search, city, pmin, pmax, ndest, sdate, edate } = filter;

    const findFilteredPackages = async (transaction) => {
      const whereConditionsDestination = [];
      const whereConditionsPackage = [];

      if (sdate && edate) {
        if (sdate > edate) {
          throw new BadRequestError(
            'Start date cannot be greater than end date',
          );
        }

        try {
          const availablePackages = await Package.findAll(
            {
              include: [
                {
                  model: TransactionModel,
                  attributes: ['startDate', 'endDate'],
                  where: {
                    startDate: {
                      [Op.lt]: sdate,
                    },
                    endDate: {
                      [Op.gt]: edate,
                    },
                  },
                  required: true,
                },
              ],
              attributes: ['id'],
            },
            { transaction },
          );

          const packageIds = availablePackages.map(
            (packageObj) => packageObj.id,
          );

          whereConditionsPackage.push({
            package_id: {
              [Op.in]: packageIds,
            },
          });
        } catch (error) {
          throw new BadRequestError('Failed to fetch available packages');
        }
      }

      if (search) {
        whereConditionsDestination.push({
          destinationName: {
            [Op.like]: `%${search}%`,
          },
        });
      }

      if (city) {
        whereConditionsDestination.push({
          city: {
            [Op.eq]: city,
          },
        });
      }

      if (pmin && pmax) {
        if (pmax < pmin) {
          throw new BadRequestError(
            'Minimum price cannot be greater than maximum price',
          );
        }

        whereConditionsPackage.push({
          price: {
            [Op.between]: [pmin, pmax],
          },
        });
      }

      if (ndest) {
        whereConditionsPackage.push({
          destination_count: {
            [Op.eq]: ndest,
          },
        });
      }

      try {
        const packages = await Package.findAll(
          {
            include: [
              {
                model: Destination,
                attributes: ['destinationName', 'city'],
                where: {
                  [Op.and]: whereConditionsDestination,
                },
                required: true,
              },
            ],
            where: {
              [Op.and]: whereConditionsPackage,
            },
            attributes: {
              exclude: [
                'description',
                'serviceDuration',
                'transactionCount',
                'createdAt',
                'updatedAt',
                'deletedAt',
              ],
            },
            transaction,
          },
          { transaction },
        );

        return packages;
      } catch (error) {
        throw new BadRequestError('Failed to fetch packages');
      }
    };

    const packages = await this.createDbTransaction(findFilteredPackages);

    return packages;
  }

  // Desc: service for get popular package list with limit 4 data
  async getPopularPackageList(limit) {
    const findPopularPackages = async (transaction) => {
      try {
        const packages = await Package.findAll({
          include: [
            {
              model: Destination,
              attributes: ['destinationName', 'city'],
              required: true,
            },
          ],
          order: [['transaction_count', 'DESC']],
          limit: limit || 4,
          attributes: {
            exclude: [
              'description',
              'serviceDuration',
              'destinationCount',
              'createdAt',
              'updatedAt',
              'deletedAt',
            ],
          },
          transaction,
        });

        return packages;
      } catch (error) {
        throw new ServerError();
      }
    };

    const packages = await this.createDbTransaction(findPopularPackages);

    return packages;
  }

  async createPackageByUser(username, packageData) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new NotFoundError('Username not found');
      }
      const newPackage = await Package.create({
        ...packageData,
        tourGuideId: user,
      });
      return newPackage;
    } catch (error) {
      throw new ServerError('Failed create package', error);
    }
  }

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
  async getPackageDetail(id) {
    const findPackageDetail = async (transaction) => {
      try {
        const packageDetail = await Package.findByPk(id, {
          include: [
            {
              model: Destination,
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt'],
              },
              required: true,
            },
          ],
          attributes: {
            exclude: [
              'destinationCount',
              'transactionCount',
              'createdAt',
              'updatedAt',
              'deletedAt',
            ],
          },
          transaction,
        });

        if (!packageDetail) {
          throw new NotFoundError('Package Not Found');
        }

        return packageDetail;
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error;
        }
        throw new ServerError('Failed to fetch package details');
      }
    };

    const packageDetail = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findPackageDetail(transaction),
    );

    return packageDetail;
  }

  static async modifyPackage(filter) {}

  static async deletePackage(filter) {}
}

module.exports = PackageService;
