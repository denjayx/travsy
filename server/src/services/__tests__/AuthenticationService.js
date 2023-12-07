const { ValidationError } = require('sequelize');
const passwordUtil = require('../../utils/passwordUtil');
const AuthenticationService = require('../AuthenticationService');
const AccountService = require('../AccountService');
const { Account, User } = require('../../models');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');
const UnauthorizedError = require('../../errors/UnauthorizedError');

// mock the dependencies
jest.mock('../../utils/passwordUtil');
jest.mock('../BaseService');
jest.mock('../../models');

describe('authentication service', () => {
  const authenticationService = AuthenticationService.getInstance();

  describe('register user account', () => {
    const mockAccount = {
      email: 'johnchena@gmail.com',
      password: '$Pander#800@',
      role: 'tourist',
    };
    const mockUser = {
      username: 'johnchena',
    };

    it('should hash password and create account successfully', async () => {
      passwordUtil.hashPassword.mockResolvedValueOnce(mockAccount.password);

      await authenticationService.registerUserAccount({
        account: mockAccount,
        user: mockUser,
      });

      expect(passwordUtil.hashPassword).toHaveBeenCalledWith(
        mockAccount.password,
      );
      expect(Account.create).toHaveBeenCalledWith(
        { ...mockAccount, password: mockAccount.password, User: mockUser },
        { include: User, transaction: expect.any(Object) },
      );
    });

    it('should throw BadRequestError when account is already registered', async () => {
      Account.create.mockImplementationOnce(() => {
        throw new ValidationError();
      });

      await expect(
        authenticationService.registerUserAccount({
          account: mockAccount,
          user: mockUser,
        }),
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw ServerError when an unexpected error occurs', async () => {
      Account.create.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        authenticationService.registerUserAccount({
          account: mockAccount,
          user: mockUser,
        }),
      ).rejects.toThrow(ServerError);
    });
  });

  describe('verify user account', () => {
    const accountService = AccountService.getInstance();

    const mockLoginField = {
      email: 'johnchena@gmail.com',
      password: '$Pander#800@',
    };
    const mockAccount = {
      id: '67ea0679-5bce-470d-917d-4e9c40ae9fc8',
      password: '$2b$10$I5Uv2U1a.8U8Ve7Rk8Xy8.reP7nMSW1wjnoTHvrMWicV7HH4tw45W',
      role: 'tourist',
    };

    it('should return the account when found', async () => {
      accountService.getAccountByEmail = jest
        .fn()
        .mockResolvedValueOnce(mockAccount);

      passwordUtil.verifyPassword.mockResolvedValueOnce(true);

      const result = await authenticationService.verifyAccount(mockLoginField);

      expect(result).toEqual(mockAccount);
      expect(accountService.getAccountByEmail).toHaveBeenCalledWith(
        mockLoginField.email,
        ['id', 'password', 'role'],
      );
      expect(passwordUtil.verifyPassword).toHaveBeenCalledWith(
        mockLoginField.password,
        mockAccount.password,
      );
    });

    it('should throw UnauthorizedError if password not match', async () => {
      accountService.getAccountByEmail = jest
        .fn()
        .mockResolvedValueOnce(mockAccount);

      passwordUtil.verifyPassword.mockResolvedValueOnce(false);

      await expect(
        authenticationService.verifyAccount(mockLoginField),
      ).rejects.toThrow(UnauthorizedError);
      expect(passwordUtil.verifyPassword).toHaveBeenCalledWith(
        mockLoginField.password,
        mockAccount.password,
      );
    });

    it('should throw ServerError when an error is thrown', async () => {
      accountService.getAccountByEmail = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new ServerError();
        });

      await expect(
        authenticationService.verifyAccount(mockLoginField),
      ).rejects.toThrow(ServerError);
    });
  });
});
