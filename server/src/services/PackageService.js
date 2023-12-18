const { Op } = require('sequelize');
const {
  package: packageModel,
  destination,
  transaction: transactionModel,
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

    const findFilteredPackageList = async (transaction) => {
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

          const bookedOrder = await transactionModel.findAll({
            attributes: ['packageId', 'startDate', 'endDate'],
            where: {
              startDate: { [Op.gt]: sdate },
              endDate: { [Op.lt]: edate },
            },
            transaction,
          });

          const bookedPackageIdList = bookedOrder.map(
            (order) => order.packageId,
          );

          whereConditionsPackage.push({
            id: {
              [Op.notIn]: bookedPackageIdList,
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
        const packageList = await packageModel.findAll({
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
          attributes: [
            'id',
            'tourGuideId',
            'packageName',
            'thumbnailUrl',
            'price',
            'destinationCount',
            'transactionCount',
          ],
          transaction,
        });

        // mapping to package with tour guided
        const packageWithTourGuideList = await Promise.all(
          packageList.map(async (tourPackage) => {
            const tourGuide = await tourPackage.getTourGuide({
              attributes: ['username', 'avatarUrl', 'firstName', 'lastName'],
              transaction,
            });

            return {
              tourGuide,
              package: {
                id: tourPackage.id,
                packageName: tourPackage.packageName,
                thumbnailUrl: tourPackage.thumbnailUrl,
                price: tourPackage.price,
                destinationCount: tourPackage.destinationCount,
                transactionCount: tourPackage.transactionCount,
                destinations: tourPackage.destinations,
              },
            };
          }),
        );

        return packageWithTourGuideList;
      } catch (error) {
        console.error(error);
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    const packages = await this.createDbTransaction(findFilteredPackageList);

    return packages;
  }

  // Desc: service for get popular package list with limit 4 data
  async getPopularPackageList(limit) {
    const findPopularPackages = async (transaction) => {
      try {
        const packageList = await packageModel.findAll({
          include: [
            {
              model: destination,
              attributes: ['destinationName', 'city'],
              required: true,
            },
          ],
          order: [['transaction_count', 'DESC']],
          limit: limit || 4,
          attributes: [
            'id',
            'tourGuideId',
            'packageName',
            'thumbnailUrl',
            'price',
            'destinationCount',
            'transactionCount',
          ],
          transaction,
        });

        // mapping to package with tour guided
        const packageWithTourGuideList = await Promise.all(
          packageList.map(async (tourPackage) => {
            const tourGuide = await tourPackage.getTourGuide({
              attributes: ['username', 'avatarUrl', 'firstName', 'lastName'],
            });

            return {
              tourGuide,
              package: {
                id: tourPackage.id,
                packageName: tourPackage.packageName,
                thumbnailUrl: tourPackage.thumbnailUrl,
                price: tourPackage.price,
                destinationCount: tourPackage.destinationCount,
                transactionCount: tourPackage.transactionCount,
                destinations: tourPackage.destinations,
              },
            };
          }),
        );

        return packageWithTourGuideList;
      } catch (error) {
        throw new ServerError();
      }
    };

    const packages = await this.createDbTransaction(findPopularPackages);

    return packages;
  }

  // get detail package by id
  async getPackageDetail(packageId) {
    const findPackageDetail = async (transaction) => {
      try {
        const packageDetail = await packageModel.findByPk(packageId, {
          include: [
            {
              model: destination,
              attributes: ['destinationName', 'city', 'description'],
              required: true,
            },
          ],
          attributes: [
            'id',
            'tourGuideId',
            'packageName',
            'thumbnailUrl',
            'price',
            'description',
            'serviceDuration',
          ],
          transaction,
        });

        if (!packageDetail) {
          throw new NotFoundError('Package Not Found');
        }

        const tourGuide = await packageDetail.getTourGuide({
          attributes: ['username', 'avatarUrl', 'firstName', 'lastName'],
          transaction,
        });

        return {
          tourGuide,
          package: {
            id: packageDetail.id,
            packageName: packageDetail.packageName,
            thumbnailUrl: packageDetail.thumbnailUrl,
            price: packageDetail.price,
            description: packageDetail.description,
            serviceDuration: packageDetail.serviceDuration,
            destinations: packageDetail.destinations,
          },
        };
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
          attributes: ['id', 'packageName', 'price', 'transactionCount'],
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

  // get detail user package by id
  async getUserPackageDetail(packageId) {
    const findPackageDetail = async (transaction) => {
      try {
        const packageDetail = await packageModel.findByPk(packageId, {
          include: [
            {
              model: destination,
              attributes: ['destinationName', 'city', 'description'],
              required: true,
            },
          ],
          attributes: [
            'id',
            'packageName',
            'thumbnailUrl',
            'price',
            'description',
            'serviceDuration',
          ],
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

  // insert data package
  async createPackage(username, packageData) {
    const insertData = async (transaction) => {
      try {
        const { destinations, ...restPackageData } = packageData;

        const createdPackage = await packageModel.create(
          {
            ...restPackageData,
            tourGuideId: username,
          },
          { attributes: ['id'], transaction },
        );

        await destinations?.reduce(async (previousPromise, destinationData) => {
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
  async updatePackage(username, packageId, packageData) {
    const updateData = async (transaction) => {
      try {
        const { destinations, ...restPackageData } = packageData;

        const affectedCount = await packageModel.update(
          { ...restPackageData },
          { where: { id: packageId, tourGuideId: username }, transaction },
        );

        if (!affectedCount[0]) {
          throw new NotFoundError('Package not found');
        }

        await destinations?.reduce(async (previousPromise, destinationData) => {
          await previousPromise;

          const createdDestination = await destination.create(
            {
              destinationName: destinationData.destinationName,
              city: destinationData.city,
              description: destinationData.description,
              packageId,
            },
            { transaction },
          );

          const currentPackage = await packageModel.findByPk(packageId, {
            attributes: ['id', 'destinationCount'],
            transaction,
          });

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

    await this.createDbTransaction(updateData);
  }

  // delete detail package by username dan id
  async deletePackage(username, packageId) {
    const deleteData = async (transaction) => {
      try {
        const affectedCount = await packageModel.destroy({
          where: {
            id: packageId,
            tourGuideId: username,
          },
          transaction,
        });

        if (!affectedCount) {
          throw new NotFoundError('Package not found');
        }
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        }
        throw new ServerError();
      }
    };

    await this.createDbTransaction(deleteData);
  }
}

module.exports = PackageService;
