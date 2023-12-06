const { ValidationError } = require('sequelize');
const passwordUtil = require('../../utils/passwordUtil');
const AuthenticationService = require('../AuthenticationService');
const { Account, User } = require('../../models');
const BadRequestError = require('../../errors/BadRequestError');
const ServerError = require('../../errors/ServerError');

// mock the dependencies
jest.mock('../../utils/passwordUtil');
jest.mock('../BaseService');
jest.mock('../../models');

describe('register user account', () => {
  const authenticationService = AuthenticationService.getInstance();

  const mockAccount = {
    email: 'johnchena@gmail.com',
    password: '$Pander#800@',
    role: 'tourist',
  };
  const mockUser = {
    username: 'johnchena',
  };

  it('should hash password and create account successfully', async () => {
    passwordUtil.hashPassword.mockReturnValueOnce(mockAccount.password);

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
