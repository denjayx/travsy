const { Account, User } = require('../../models');
const UserService = require('../UserService');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');

jest.mock('../BaseService');
jest.mock('../../models');

describe('user service', () => {
  const userService = UserService.getInstance();

  describe('get user profile', () => {
    const mockUsername = 'johndoe';
    const mockFetchedUserProfile = {
      Account: {
        email: 'johndoe@gmail.com',
      },
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
});
