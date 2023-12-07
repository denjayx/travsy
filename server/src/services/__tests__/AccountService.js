const AccountService = require('../AccountService');
const { Account } = require('../../models');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');

// mock the dependencies
jest.mock('../BaseService');
jest.mock('../../models');

describe('account service', () => {
  const accountService = AccountService.getInstance();
  const mockAccount = { id: 1, email: 'test@example.com' };

  describe('get account by email', () => {
    it('should return the account when found', async () => {
      Account.findOne.mockResolvedValueOnce(mockAccount);

      const result = await accountService.getAccountByEmail(mockAccount.email, [
        'id',
        'email',
      ]);

      expect(result).toEqual(mockAccount);
    });

    it('should throw NotFoundError when account is not found', async () => {
      Account.findOne.mockResolvedValueOnce(null);

      await expect(
        accountService.getAccountByEmail(mockAccount.email, ['id', 'email']),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw ServerError when an error is thrown', async () => {
      Account.findOne.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(
        accountService.getAccountByEmail(mockAccount.email, ['id', 'email']),
      ).rejects.toThrow(ServerError);
    });

    afterEach(() => {
      expect(Account.findOne).toHaveBeenCalledWith({
        where: { email: mockAccount.email },
        attributes: ['id', 'email'],
        transaction: expect.any(Object),
      });
    });
  });
});
