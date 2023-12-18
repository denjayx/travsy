class User {
  static findByPK = jest.fn();

  static update = jest.fn();

  static findOne = jest.fn();
}

module.exports = User;
