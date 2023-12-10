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

          const availablePackageList = await packageModel.findAll({
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

          const packageIds = availablePackageList.map(
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
              attributes: ['avatarUrl', 'firstName', 'lastName'],
              transaction,
            });

            return {
              tourGuide,
              package: tourPackage,
            };
          }),
        );

        return packageWithTourGuideList;
      } catch (error) {
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
              attributes: ['avatarUrl', 'firstName', 'lastName'],
            });

            return {
              tourGuide,
              package: tourPackage,
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
          attributes: ['avatarUrl', 'firstName', 'lastName'],
          transaction,
        });

        return { tourGuide, package: packageDetail };
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
        const userData = await user.findByPk(username, {
          include: [{ model: account, attributes: ['role'] }],
          attributes: ['username'],
          transaction,
        });

        const packageToBeUpdated = await packageModel.findByPk(packageId, {
          attributes: ['id', 'tourGuideId'],
        });

        if (!userData || !packageToBeUpdated) {
          throw new NotFoundError('User or package not found');
        }

        if (
          userData.account.role !== 'tour guide' ||
          username !== packageToBeUpdated.tourGuideId
        ) {
          throw new ForbiddenError(
            'You are prohibited from updating this package',
          );
        }

        const { destinations, ...restPackageData } = packageData;

        await packageModel.update(
          { ...restPackageData },
          { where: { id: packageToBeUpdated.id }, transaction },
        );

        await destinations?.reduce(async (previousPromise, destinationData) => {
          await previousPromise;

          const createdDestination = await destination.create(
            {
              destinationName: destinationData.destinationName,
              city: destinationData.city,
              description: destinationData.description,
              packageId: packageToBeUpdated.id,
            },
            { transaction },
          );

          const currentPackage = await packageModel.findByPk(
            packageToBeUpdated.id,
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
        } else {
          throw new ServerError();
        }
      }
    };

    await this.createDbTransaction(updateData);
  }

  // delete detail package by username dan id
  async deletePackage(username, packageId) {
    const deleteData = async (transaction) => {
      try {
        const userData = await user.findByPk(username, {
          include: [{ model: account, attributes: ['role'] }],
          attributes: ['username'],
          transaction,
        });

        const packageToBeDeleted = await packageModel.findByPk(packageId, {
          attributes: ['id', 'tourGuideId'],
        });

        if (!userData || !packageToBeDeleted) {
          throw new NotFoundError('User or package not found');
        }

        if (
          userData.account.role !== 'tour guide' ||
          username !== packageToBeDeleted.tourGuideId
        ) {
          throw new ForbiddenError(
            'You are prohibited from deleting this package',
          );
        }

        await packageModel.destroy({
          where: {
            id: packageId,
            tourGuideId: username,
          },
        });
      } catch (error) {
        if (error instanceof BaseResponseError) {
          throw error;
        } else {
          throw new ServerError();
        }
      }
    };

    await this.createDbTransaction(deleteData);
  }
}

module.exports = PackageService;
