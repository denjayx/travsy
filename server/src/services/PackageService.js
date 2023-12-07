const { Op } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  User,
} = require('../models');
const BaseService = require('./BaseService');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BaseResponseError = require('../errors/BaseResponseError');

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
    const { search, city, pmin, pmax, ndest, sdate, edate } = filter;

    const findFilteredPackages = async (transaction) => {
      const whereConditionsDestination = [];
      const whereConditionsPackage = [];

      try {
        // date filtering
        if (sdate && edate) {
          if (sdate > edate) {
            throw new BadRequestError(
              'Start date cannot be greater than end date',
            );
          }

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
        }

        // search filtering
        if (search) {
          whereConditionsDestination.push({
            destinationName: {
              [Op.like]: `%${search}%`,
            },
          });
        }

        // city filtering
        if (city) {
          whereConditionsDestination.push({
            city: {
              [Op.eq]: city,
            },
          });
        }

        // price filtering
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

        // destination count filtering
        if (ndest) {
          whereConditionsPackage.push({
            destination_count: {
              [Op.eq]: ndest,
            },
          });
        }

        // get packages with validated filters
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
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
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

  // insert data package
  async createPackageByUser(username, packageData) {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw new NotFoundError('Username not found');
      }

      const newPackage = await Package.create({
        id: packageData.packageId,
        tourGuideId: user.username, // Menggunakan username sebagai tur guide ID
        packageName: packageData.packageName,
        thumbnailUrl: packageData.thumbnailUrl,
        price: packageData.price,
        description: packageData.description,
        serviceDuration: packageData.duration,
        destinationCount: 0,
        transactionCount: 0,
      });

      return newPackage;
    } catch (error) {
      throw new ServerError('Failed create package', error);
    }
  }

  // menemukan package berdasarkan username
  async getPackageByUsername(tourGuideId) {
    const findPackageByUsername = async (transaction) => {
      try {
        const packages = await Package.findAll({
          where: { tourGuideId },
          attributes: ['id', 'packageName', 'price', 'serviceDuration'],
          transaction,
        });

        if (!packages.length) {
          throw new NotFoundError('Packages not found');
        }

        return packages;
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const packages = await this.createDbTransaction(findPackageByUsername);

    return packages;
  }

  // get detail package berdasarkan username
  async getDetailPackageByUsername(username, id) {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const detailPackagesIdByUsername = await Package.findOne({
        where: {
          id,
          tourGuideId: username,
        },
        include: [Destination, TransactionModel],
      });

      if (!detailPackagesIdByUsername) {
        throw new NotFoundError('Package not found');
      }

      return detailPackagesIdByUsername;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new ServerError('Internal server error');
      }
    }
  }

  // update detail package by id dengan username
  async updateDetailPackageByUsername(username, id, updatedPackageData) {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const packageToUpdate = await Package.findOne({
        where: {
          id,
          tourGuideId: username, // Menggunakan username sebagai tur guide ID
        },
      });

      if (!packageToUpdate) {
        throw new NotFoundError('Package not found');
      }

      // lakukan update data
      await packageToUpdate.update(updatedPackageData);
      const updatedPackage = await Package.findByPk(id);

      return updatedPackage;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new ServerError('Internal server error');
      }
    }
  }

  // delete detail package by username dan id
  async deletePackagesByUsernameAndId(username, id) {
    try {
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const deletedPackage = await Package.destroy({
        where: {
          id,
          tourGuideId: username,
        },
      });

      if (!deletedPackage) {
        throw new NotFoundError('Package not found');
      }

      return { message: 'Package deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new ServerError('Internal server error');
      }
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
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const packageDetail = await this.createDbTransaction(findPackageDetail);

    return packageDetail;
  }
}

module.exports = PackageService;
