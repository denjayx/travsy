class BaseService {
  createDbTransaction = jest.fn((callback) => callback({}));
}

module.exports = BaseService;
