const { Op } = require('sequelize');
const {
  Package,
  Destination,
  Transaction: TransactionModel,
  User,
} = require('../../models');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');
const NotFoundError = require('../../errors/NotFoundError');
const PackageService = require('../PackageService');

// mock the dependencies
jest.mock('../BaseService');
jest.mock('../../models');

describe('package service', () => {
  const packageService = PackageService.getInstance();

  describe('get filtered package list', () => {
    it('should return array', async () => {
      const filter = { search: 'Lot' };

      Package.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPackageList(filter);

      expect(Array.isArray(result)).toBe(true);
      expect(Package.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Destination,
            attributes: ['destinationName', 'city'],
            where: {
              [Op.and]: expect.any(Object),
            },
            required: true,
          },
        ],
        where: {
          [Op.and]: expect.any(Object),
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

    it('should throw BadRequestError when maximum price is lower than minimum date', async () => {
      const filter = {
        pmax: 1,
        pmin: 10,
      };

      await expect(packageService.getPackageList(filter)).rejects.toThrow(
        BadRequestError,
      );
    });

    it('should throw ServerError when an error is thrown', async () => {
      Package.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(packageService.getPackageList({})).rejects.toThrow(
        ServerError,
      );
      expect(Package.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Destination,
            attributes: ['destinationName', 'city'],
            where: {
              [Op.and]: expect.any(Object),
            },
            required: true,
          },
        ],
        where: {
          [Op.and]: expect.any(Object),
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
        transaction: expect.any(Object),
      });
    });
  });

  describe('get popular package list', () => {
    it('should return array', async () => {
      Package.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPopularPackageList();

      expect(Array.isArray(result)).toBe(true);
      expect(Package.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: Destination,
            attributes: ['destinationName', 'city'],
            required: true,
          },
        ],
        order: [['transaction_count', 'DESC']],
        limit: expect.any(Number),
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
        transaction: expect.any(Object),
      });
    });

    it('should throw ServerError when an error is thrown', async () => {
      Package.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(packageService.getPopularPackageList()).rejects.toThrow(
        ServerError,
      );
    });
  });

  describe('get package detail', () => {
    const id = 1;

    it('should return an object', async () => {
      Package.findByPk.mockResolvedValueOnce({});

      const result = await packageService.getPackageDetail(id);

      expect(typeof result).toBe('object');
      expect(Package.findByPk).toHaveBeenCalledWith(id, {
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
        transaction: expect.any(Object),
      });
    });

    it('should throw NotFoundError when package detail not found', async () => {
      Package.findByPk.mockResolvedValueOnce(undefined);

      await expect(packageService.getPackageDetail(id)).rejects.toThrow(
        NotFoundError,
      );
      expect(Package.findByPk).toHaveBeenCalledWith(id, {
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
        transaction: expect.any(Object),
      });
    });

    it('should throw ServerError when an error is thrown', async () => {
      Package.findByPk.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(packageService.getPackageDetail(id)).rejects.toThrow(
        ServerError,
      );
    });
  });

  describe('get package list by username', () => {
    const username = 'johndoe';

    it('should return array', async () => {
      Package.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPackageListByUsername(username);

      expect(Array.isArray(result)).toBe(true);
      expect(Package.findAll).toHaveBeenCalledWith({
        where: { tourGuideId: username },
        attributes: ['id', 'packageName', 'price', 'serviceDuration'],
        transaction: expect.any(Object),
      });
    });

    it('should return ServerError when an error is thrown', async () => {
      Package.findAll.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        packageService.getPackageListByUsername(username),
      ).rejects.toThrow(ServerError);
    });
  });
});