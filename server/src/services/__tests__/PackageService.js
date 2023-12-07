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
    it('should return package list', async () => {
      const filter = { search: 'Lot' };

      Package.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPackageList(filter);

      expect(result).toEqual([]);
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
    });
  });

  describe('get popular package list', () => {
    it('should return package list', async () => {
      Package.findAll.mockResolvedValueOnce([]);

      const result = await packageService.getPopularPackageList();

      expect(result).toEqual([]);
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
});
