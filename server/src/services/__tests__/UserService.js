const { ValidationError } = require('sequelize');
const { account, user } = require('../../models');
const UserService = require('../UserService');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');
const BadRequestError = require('../../errors/BadRequestError');

jest.mock('../BaseService');
jest.mock('../../models');

describe('user service', () => {
  const userService = UserService.getInstance();
  const mockUsername = 'johndoe';
  const mockUserProfile = {
    avatarUrl: null,
    firstName: null,
    lastName: null,
    biography: null,
    nik: null,
    phone: null,
    province: null,
    city: null,
    gender: null,
  };
  const mockAccount = { email: 'johndoe@example.com' };
  const accountId = 1;

  describe('get user profile', () => {
    const mockFetchedUserProfile = {
      account: mockAccount,
      ...mockUserProfile,
    };
    const mockReturnedUserProfile = {
      email: mockFetchedUserProfile.account.email,
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
      user.findByPk.mockResolvedValueOnce(mockFetchedUserProfile);

      const result = await userService.getUserProfile(mockUsername);

      expect(result).toEqual(mockReturnedUserProfile);
      expect(user.findByPk).toHaveBeenCalledWith(mockUsername, {
        attributes: [
          'avatarUrl',
          'firstName',
          'lastName',
          'biography',
          'nik',
          'phone',
          'province',
          'city',
          'gender',
        ],
        include: {
          model: account,
          attributes: ['email'],
        },
        transaction: expect.any(Object),
      });
    });

    it('should throw NotFoundError when user profile not found', async () => {
      user.findByPk.mockResolvedValueOnce(undefined);

      await expect(userService.getUserProfile(mockUsername)).rejects.toThrow(
        NotFoundError,
      );
    });

    it('should throw ServerError when an error is thrown', async () => {
      user.findByPk.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(userService.getUserProfile(mockUsername)).rejects.toThrow(
        ServerError,
      );
    });
  });

  describe('update user profile', () => {
    it('should successfully update user profile', async () => {
      const mockUserUpdated = { accountId };

      user.update.mockResolvedValueOnce([1]);
      user.findByPk.mockResolvedValueOnce(mockUserUpdated);

      await userService.updateUserProfile(
        mockUsername,
        mockUserProfile,
        mockAccount,
      );

      expect(user.update).toHaveBeenCalledWith(mockUserProfile, {
        where: { username: mockUsername },
        transaction: expect.any(Object),
      });
      expect(user.findByPk).toHaveBeenCalledWith(mockUsername, {
        attributes: 'accountId',
        transaction: expect.any(Object),
      });
      expect(account.update).toHaveBeenCalledWith(mockAccount, {
        where: { id: mockUserUpdated.accountId },
        transaction: expect.any(Object),
      });
    });

    it('should throw NotFoundError when there are no user updated', async () => {
      user.update.mockResolvedValueOnce([0]);

      await expect(
        userService.updateUserProfile(
          mockUsername,
          mockUserProfile,
          mockAccount,
        ),
      ).rejects.toThrow(NotFoundError);
      expect(user.update).toHaveBeenCalledWith(mockUserProfile, {
        where: { username: mockUsername },
        transaction: expect.any(Object),
      });
    });

    it('should throw BadRequestError when an ValidationError is thrown', async () => {
      user.update.mockImplementationOnce(() => {
        throw new ValidationError();
      });

      await expect(
        userService.updateUserProfile(
          mockUsername,
          mockUserProfile,
          mockAccount,
        ),
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw ServerError when an Error is thrown', async () => {
      user.update.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        userService.updateUserProfile(
          mockUsername,
          mockUserProfile,
          mockAccount,
        ),
      ).rejects.toThrow(ServerError);
    });
  });
});
