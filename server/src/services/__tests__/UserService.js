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
    email: 'johndoe@example.com',
    avatarUrl: null,
    firstName: 'John',
    lastName: 'Doe',
    biography: null,
    nik: null,
    phone: null,
    province: null,
    city: null,
    gender: null,
  };
  const { email, ...userData } = mockUserProfile;

  describe('get user profile', () => {
    const mockFetchedUserProfile = {
      account: { email },
      ...userData,
    };

    it('should return user profile when found', async () => {
      user.findByPk.mockResolvedValueOnce(mockFetchedUserProfile);

      const result = await userService.getUserProfile(mockUsername);

      expect(result).toEqual(mockUserProfile);
    });

    it('should throw NotFoundError when user profile not found', async () => {
      user.findByPk.mockResolvedValueOnce(null);

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

    afterEach(() => {
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
  });

  describe('update user profile', () => {
    const mockUserUpdated = { acountId: 1 };

    it('should successfully update user profile', async () => {
      user.update.mockResolvedValueOnce([1]);
      user.findByPk.mockResolvedValueOnce(mockUserUpdated);

      await userService.updateUserProfile(mockUsername, mockUserProfile);

      expect(user.update).toHaveBeenCalledWith(userData, {
        where: { username: mockUsername },
        transaction: expect.any(Object),
      });
      expect(user.findByPk).toHaveBeenCalledWith(mockUsername, {
        attributes: ['accountId'],
        transaction: expect.any(Object),
      });
      expect(account.update).toHaveBeenCalledWith(
        { email },
        {
          where: { id: mockUserUpdated.accountId },
          transaction: expect.any(Object),
        },
      );
    });

    it('should throw NotFoundError when there are no user updated', async () => {
      user.update.mockResolvedValueOnce([0]);

      await expect(
        userService.updateUserProfile(mockUsername, mockUserProfile),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw BadRequestError when an ValidationError is thrown', async () => {
      user.update.mockImplementationOnce(() => {
        throw new ValidationError();
      });

      await expect(
        userService.updateUserProfile(mockUsername, mockUserProfile),
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw ServerError when an Error is thrown', async () => {
      user.update.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        userService.updateUserProfile(mockUsername, mockUserProfile),
      ).rejects.toThrow(ServerError);
    });

    afterEach(() => {
      expect(user.update).toHaveBeenCalledWith(
        { ...userData },
        {
          where: { username: mockUsername },
          transaction: expect.any(Object),
        },
      );
    });
  });
});
