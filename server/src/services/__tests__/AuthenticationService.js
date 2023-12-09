const { ValidationError } = require('sequelize');
const passwordUtil = require('../../utils/passwordUtil');
const AuthenticationService = require('../AuthenticationService');
const { account, user } = require('../../models');
const BadRequestError = require('../../errors/BadRequestError');
const UnauthorizedError = require('../../errors/UnauthorizedError');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');

// mock the dependencies
jest.mock('../../utils/passwordUtil');
jest.mock('../BaseService');
jest.mock('../../models');

describe('authentication service', () => {
  const authenticationService = AuthenticationService.getInstance();

  describe('register user account', () => {
    const mockAccountData = {
      email: 'johnchena@gmail.com',
      password: '$Pander#800@',
      role: 'tourist',
    };
    const mockUserData = {
      username: 'johnchena',
    };

    it('should hash password and create account successfully', async () => {
      passwordUtil.hashPassword.mockResolvedValueOnce(mockAccountData.password);

      await authenticationService.registerUserAccount({
        accountData: mockAccountData,
        userData: mockUserData,
      });

      expect(passwordUtil.hashPassword).toHaveBeenCalledWith(
        mockAccountData.password,
      );
      expect(account.create).toHaveBeenCalledWith(
        {
          ...mockAccountData,
          password: mockAccountData.password,
          user: mockUserData,
        },
        { include: user, transaction: expect.any(Object) },
      );
    });

    it('should throw BadRequestError when account is already registered', async () => {
      account.create.mockImplementationOnce(() => {
        throw new ValidationError();
      });

      await expect(
        authenticationService.registerUserAccount({
          accountData: mockAccountData,
          userData: mockUserData,
        }),
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw ServerError when an unexpected error occurs', async () => {
      account.create.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        authenticationService.registerUserAccount({
          accountData: mockAccountData,
          userData: mockUserData,
        }),
      ).rejects.toThrow(ServerError);
    });
  });

  describe('verify user account', () => {
    const mockLoginField = {
      email: 'johnchena@gmail.com',
      password: '$Pander#800@',
    };
    const mockAccount = {
      id: 1,
      password: 'password',
      role: 'tourist',
    };

    it('should return the account when found', async () => {
      account.findOne.mockResolvedValueOnce(mockAccount);

      passwordUtil.verifyPassword.mockResolvedValueOnce(true);

      const accountData =
        await authenticationService.verifyAccount(mockLoginField);

      expect(accountData).toEqual(mockAccount);
      expect(account.findOne).toHaveBeenCalledWith({
        where: { email: mockLoginField.email },
        attributes: ['id', 'password', 'role'],
        transaction: expect.any(Object),
      });
      expect(passwordUtil.verifyPassword).toHaveBeenCalledWith(
        mockLoginField.password,
        mockAccount.password,
      );
    });

    it('should throw NotFoundError if email not found', async () => {
      account.findOne.mockResolvedValueOnce(null);

      await expect(
        authenticationService.verifyAccount(mockLoginField),
      ).rejects.toThrow(NotFoundError);
      expect(account.findOne).toHaveBeenCalledWith({
        where: { email: mockLoginField.email },
        attributes: ['id', 'password', 'role'],
        transaction: expect.any(Object),
      });
    });

    it('should throw UnauthorizedError if password not match', async () => {
      account.findOne.mockResolvedValueOnce(mockAccount);

      passwordUtil.verifyPassword.mockResolvedValueOnce(false);

      await expect(
        authenticationService.verifyAccount(mockLoginField),
      ).rejects.toThrow(UnauthorizedError);
      expect(account.findOne).toHaveBeenCalledWith({
        where: { email: mockLoginField.email },
        attributes: ['id', 'password', 'role'],
        transaction: expect.any(Object),
      });
      expect(passwordUtil.verifyPassword).toHaveBeenCalledWith(
        mockLoginField.password,
        mockAccount.password,
      );
    });

    it('should throw ServerError when an error is thrown', async () => {
      account.findOne.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        authenticationService.verifyAccount(mockLoginField),
      ).rejects.toThrow(ServerError);
    });
  });
});
