const { Op } = require('sequelize');
const {
  package: packageModel,
  destination,
  transaction: transactionModel,
} = require('../../models');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');
// const NotFoundError = require('../../errors/NotFoundError');
const PackageService = require('../PackageService');

// mock the dependencies
jest.mock('../BaseService');
jest.mock('../../models');

describe('package service', () => {
  const packageService = PackageService.getInstance();

  describe('get filtered package list', () => {
    it('should return array', async () => {
      const filter = { search: 'Lot' };

      packageModel.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPackageList(filter);

      expect(Array.isArray(result)).toBe(true);
      expect(packageModel.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: destination,
            attributes: ['destinationName', 'city'],
            where: {
              [Op.and]: [
                { destinationName: { [Op.like]: `%${filter.search}%` } },
              ],
            },
            required: true,
          },
        ],
        where: {
          [Op.and]: [],
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
        transaction: expect.any(Object),
      });
    });

    it('should throw BadRequestError when start date is greater than end date', async () => {
      const filter = {
        sdate: '2023-12-08',
        edate: '2023-12-07',
      };

      await expect(packageService.getPackageList(filter)).rejects.toThrow(
        BadRequestError,
      );
    });

    // it('should throw BadRequestError when maximum price is lower than minimum date', async () => {
    //   const filter = {
    //     sdate: '2023-12-07',
    //     edate: '2023-12-08',
    //     pmax: 1,
    //     pmin: 10,
    //   };

    //   packageModel.findAll.mockResolvedValueOnce([]);

    //   await expect(packageService.getPackageList(filter)).rejects.toThrow(
    //     BadRequestError,
    //   );
    //   expect(packageModel.findAll).toHaveBeenCalledWith({
    //     include: [
    //       {
    //         model: transactionModel,
    //         attributes: ['startDate', 'endDate'],
    //         where: {
    //           startDate: {
    //             [Op.lt]: filter.sdate,
    //           },
    //           endDate: {
    //             [Op.gt]: filter.edate,
    //           },
    //         },
    //         required: true,
    //       },
    //     ],
    //     attributes: ['id'],
    //     transaction: expect.any(Object),
    //   });
    // });

    it('should throw ServerError when an error is thrown', async () => {
      packageModel.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(packageService.getPackageList({})).rejects.toThrow(
        ServerError,
      );
      expect(packageModel.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: destination,
            attributes: ['destinationName', 'city'],
            where: {
              [Op.and]: [],
            },
            required: true,
          },
        ],
        where: {
          [Op.and]: [],
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
        transaction: expect.any(Object),
      });
    });
  });

  describe('get popular package list', () => {
    it('should return array', async () => {
      packageModel.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPopularPackageList();

      expect(Array.isArray(result)).toBe(true);
    });

    it('should throw ServerError when an error is thrown', async () => {
      packageModel.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(packageService.getPopularPackageList()).rejects.toThrow(
        ServerError,
      );
    });

    afterEach(() => {
      expect(packageModel.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: destination,
            attributes: ['destinationName', 'city'],
            required: true,
          },
        ],
        order: [['transaction_count', 'DESC']],
        limit: expect.any(Number),
        attributes: [
          'id',
          'tourGuideId',
          'packageName',
          'thumbnailUrl',
          'price',
          'destinationCount',
          'transactionCount',
        ],
        transaction: expect.any(Object),
      });
    });
  });

  // describe('get package detail', () => {
  //   const id = 1;

  //   it('should return an object', async () => {
  //     packageModel.findByPk.mockResolvedValueOnce({});

  //     const result = await packageService.getPackageDetail(id);

  //     expect(typeof result).toBe('object');
  //     expect(packageModel.findByPk).toHaveBeenCalledWith(id, {
  //       include: [
  //         {
  //           model: destination,
  //           attributes: {
  //             exclude: ['createdAt', 'updatedAt', 'deletedAt'],
  //           },
  //           required: true,
  //         },
  //       ],
  //       attributes: {
  //         exclude: [
  //           'destinationCount',
  //           'transactionCount',
  //           'createdAt',
  //           'updatedAt',
  //           'deletedAt',
  //         ],
  //       },
  //       transaction: expect.any(Object),
  //     });
  //   });

  //   it('should throw NotFoundError when package detail not found', async () => {
  //     packageModel.findByPk.mockResolvedValueOnce(undefined);

  //     await expect(packageService.getPackageDetail(id)).rejects.toThrow(
  //       NotFoundError,
  //     );
  //     expect(packageModel.findByPk).toHaveBeenCalledWith(id, {
  //       include: [
  //         {
  //           model: destination,
  //           attributes: {
  //             exclude: ['createdAt', 'updatedAt', 'deletedAt'],
  //           },
  //           required: true,
  //         },
  //       ],
  //       attributes: {
  //         exclude: [
  //           'destinationCount',
  //           'transactionCount',
  //           'createdAt',
  //           'updatedAt',
  //           'deletedAt',
  //         ],
  //       },
  //       transaction: expect.any(Object),
  //     });
  //   });

  //   it('should throw ServerError when an error is thrown', async () => {
  //     packageModel.findByPk.mockImplementationOnce(() => {
  //       throw new Error();
  //     });

  //     await expect(packageService.getPackageDetail(id)).rejects.toThrow(
  //       ServerError,
  //     );
  //   });
  // });

  // describe('get package list by username', () => {
  //   const username = 'johndoe';

  //   it('should return array', async () => {
  //     Package.findAll.mockResolvedValueOnce([]);

  //     const result = await packageService.getPackageListByUsername(username);

  //     expect(Array.isArray(result)).toBe(true);
  //     expect(Package.findAll).toHaveBeenCalledWith({
  //       where: { tourGuideId: username },
  //       attributes: ['id', 'packageName', 'price', 'serviceDuration'],
  //       transaction: expect.any(Object),
  //     });
  //   });

  //   it('should return ServerError when an error is thrown', async () => {
  //     Package.findAll.mockImplementationOnce(() => {
  //       throw new Error();
  //     });

  //     await expect(
  //       packageService.getPackageListByUsername(username),
  //     ).rejects.toThrow(ServerError);
  //   });
  // });
});
