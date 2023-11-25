const { Op, Transaction } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  sequelize,
} = require('../models');
const BadRequestError = require('../errors/BadRequestError');

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
        console.error(error);
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

  static async insertPackage(filter) {}

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
