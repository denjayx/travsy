const { Account, User } = require('../../models');
const UserService = require('../UserService');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');
const { ValidationError } = require('sequelize');
const BadRequestError = require('../../errors/BadRequestError');

jest.mock('../BaseService');
jest.mock('../../models');

describe('user service', () => {
  const userService = UserService.getInstance();
  const mockUsername = 'johndoe';
  const mockUser = {
    avatarUrl: null,
    firstName: null,
    lastName: null,
    biography: null,
    nik: null,
    phone: null,
    province: null,
    city: null,
    gender: null,
    cardNumber: null,
  };
  const mockAccount = { email: 'johndoe@example.com' };
  const accountId = 1;

  describe('get user profile', () => {
    const mockFetchedUserProfile = {
      Account: mockAccount,
      ...mockUser,
    };
    const mockReturnedUserProfile = {
      email: mockFetchedUserProfile.Account.email,
      avatarUrl: mockFetchedUserProfile.avatarUrl,
      firstName: mockFetchedUserProfile.firstName,
      lastName: mockFetchedUserProfile.lastName,
      biography: mockFetchedUserProfile.biography,
      nik: mockFetchedUserProfile.nik,
      phone: mockFetchedUserProfile.phone,
      province: mockFetchedUserProfile.province,
      city: mockFetchedUserProfile.city,
      gender: mockFetchedUserProfile.gender,
      cardNumber: mockFetchedUserProfile.cardNumber,
    };

    it('should return user profile when found', async () => {
      User.findByPk.mockResolvedValueOnce(mockFetchedUserProfile);

      const result = await userService.getUserProfile(mockUsername);

      expect(result).toEqual(mockReturnedUserProfile);
    });

    it('should throw NotFoundError when user profile not found', async () => {
      User.findByPk.mockResolvedValueOnce(undefined);

      await expect(userService.getUserProfile(mockUsername)).rejects.toThrow(
        NotFoundError,
      );
    });

    it('should throw ServerError when an error is thrown', async () => {
      User.findByPk.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(userService.getUserProfile(mockUsername)).rejects.toThrow(
        ServerError,
      );
    });

    afterEach(() => {
      expect(User.findByPk).toHaveBeenCalledWith(mockUsername, {
        attributes: {
          exclude: [
            'username',
            'accountId',
            'createdAt',
            'updatedAt',
            'deletedAt',
          ],
        },
        include: {
          model: Account,
          attributes: ['email'],
        },
        transaction: expect.any(Object),
      });
    });
  });

  describe('update user profile', () => {
    it('should successfully update user profile', async () => {
      const mockUserUpdated = { accountId };

      User.update.mockResolvedValueOnce([1]);
      User.findByPk.mockResolvedValueOnce(mockUserUpdated);

      await userService.updateUserProfile(mockUsername, mockUser, mockAccount);

      expect(User.update).toHaveBeenCalledWith(mockUser, {
        where: { username: mockUsername },
        transaction: expect.any(Object),
      });
      expect(User.findByPk).toHaveBeenCalledWith(mockUsername, {
        transaction: expect.any(Object),
      });
      expect(Account.update).toHaveBeenCalledWith(mockAccount, {
        where: { id: mockUserUpdated.accountId },
        transaction: expect.any(Object),
      });
    });

    it('should throw NotFoundError when there are no user updated', async () => {
      User.update.mockResolvedValueOnce([0]);

      await expect(
        userService.updateUserProfile(mockUsername, mockUser, mockAccount),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError when an ValidationError is thrown', async () => {
      User.update.mockImplementationOnce(() => {
        throw new ValidationError();
      });

      await expect(
        userService.updateUserProfile(mockUsername, mockUser, mockAccount),
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw ServerError when an Error is thrown', async () => {
      User.update.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        userService.updateUserProfile(mockUsername, mockUser, mockAccount),
      ).rejects.toThrow(ServerError);
    });
  });
});
