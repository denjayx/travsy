const { Op } = require('sequelize');
const {
  package: packageModel,
  destination,
  transaction: transactionModel,
  account,
  user,
} = require('../models');
const BaseService = require('./BaseService');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BaseResponseError = require('../errors/BaseResponseError');
const ForbiddenError = require('../errors/ForbiddenError');

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

          const availablePackages = await packageModel.findAll({
            include: [
              {
                model: transactionModel,
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
            transaction,
          });

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
        const packages = await packageModel.findAll({
          include: [
            {
              model: destination,
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
        });

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
        const packages = await packageModel.findAll({
          include: [
            {
              model: destination,
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

  // get detail package by id
  async getPackageDetail(id) {
    const findPackageDetail = async (transaction) => {
      try {
        const packageDetail = await packageModel.findByPk(id, {
          include: [
            {
              model: destination,
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

  // menemukan package berdasarkan username
  async getUserPackageList(tourGuideId) {
    const findPackageByUsername = async (transaction) => {
      try {
        const packages = await packageModel.findAll({
          where: { tourGuideId },
          attributes: ['id', 'packageName', 'price', 'serviceDuration'],
          transaction,
        });

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

  // insert data package
  async createPackage(username, packageData) {
    const insertData = async (transaction) => {
      try {
        const userData = await user.findByPk(username, {
          include: [{ model: account, attributes: ['role'] }],
          attributes: ['username'],
          transaction,
        });

        if (!userData) {
          throw new NotFoundError('User not found');
        }

        if (userData.account.role !== 'tour guide') {
          throw new ForbiddenError(
            'You logged in as tourist. Please logged in as tour guide to create a package',
          );
        }

        const { destinations, ...restPackageData } = packageData;

        const createdPackage = await packageModel.create(
          {
            ...restPackageData,
            tourGuideId: username,
          },
          { attributes: ['id'], transaction },
        );

        await destinations.reduce(async (previousPromise, destinationData) => {
          await previousPromise;

          const createdDestination = await destination.create(
            {
              destinationName: destinationData.destinationName,
              city: destinationData.city,
              description: destinationData.description,
              packageId: createdPackage.id,
            },
            { transaction },
          );

          const currentPackage = await packageModel.findByPk(
            createdPackage.id,
            { attributes: ['id', 'destinationCount'], transaction },
          );

          await packageModel.update(
            { destinationCount: currentPackage.destinationCount + 1 },
            { where: { id: currentPackage.id }, transaction },
          );

          return Promise.resolve(createdDestination);
        }, Promise.resolve());
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    await this.createDbTransaction(insertData);
  }

  // update detail package by id dengan username
  async updatePackage(username, id, updatedPackageData) {
    try {
      const user = await user.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const packageToUpdate = await packageModel.findOne({
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
      const updatedPackage = await packageModel.findByPk(id);

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
  async deletePackage(username, id) {
    try {
      const user = await user.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      const deletedPackage = await packageModel.destroy({
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
}

module.exports = PackageService;
