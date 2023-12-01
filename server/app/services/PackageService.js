const { Op, Transaction } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  User,
  sequelize,
} = require('../models');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');

class PackageService {
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
        throw new BadRequestError(
          `Error filter: filter ${key} tidak dapat ditemukan`,
        );
      }
    });

    const { search, city, pmin, pmax, ndest, sdate, edate } = filter;

    const findPackagesWithFilters = async (transaction) => {
      const whereConditionsDestination = [];
      const whereConditionsPackage = [];

      if (sdate && edate) {
        if (sdate > edate) {
          throw new BadRequestError(
            'Error filter: tanggal mulai tidak boleh lebih besar dari tanggal berakhir',
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
            'Error filter: harga maksimum tidak boleh lebih kecil dari harga minimum',
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
            transaction,
          },
          { transaction },
        );

        return packages;
      } catch (error) {
        throw new BadRequestError('Failed to fetch packages');
      }
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findPackagesWithFilters(transaction),
    );

    return result;
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
          attributes: [
            'id',
            'thumbnailUrl',
            'packageName',
            'price',
            'description',
            'transaction_count',
          ],
          transaction,
        });

        return packages;
      } catch (error) {
        console.error(error);
        throw new ServerError();
      }
    };

    const result = await sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      },
      async (transaction) => findPopularPackages(transaction),
    );

    return result;
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
      console.error(error);
      throw new ServerError('Failed create package', error);
    }
  }

  // menemukan package berdasarkan username
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
      console.error(error);
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
      console.log(error);
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
}

module.exports = PackageService;
