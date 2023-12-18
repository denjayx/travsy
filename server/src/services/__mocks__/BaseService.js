class BaseService {
  createDbTransaction = jest
    .fn()
    .mockImplementation((callback) => callback({}));
}

module.exports = BaseService;
