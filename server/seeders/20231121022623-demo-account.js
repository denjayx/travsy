/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          account_id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'tourist1@example.com',
          password:
            '$2b$12$2Q4Pzq7AfnLYZVzYU2s1KOABZvAEl9FR2TL2k5tqudqlDNBHoCuZm',
          role: 'tourist',
        },
        {
          account_id: '551e8400-e29b-41d4-a716-446655440001',
          email: 'tourguide1@example.com',
          password:
            '$2b$12$3.QhoBX4D.e8/KQjFlDvwOlrd/BINy3b1a2Kfn/K4ZAmCz2ik.x1u',
          role: 'tour guide',
        },
        {
          account_id: '552e8400-e29b-41d4-a716-446655440002',
          email: 'tourist2@example.com',
          password:
            '$2b$12$9R8t0Rn2cNRoJ4iBikOjfu.EC/d0SJwVe8UNck7aIlsrLSaAbYHMC',
          role: 'tourist',
        },
        {
          account_id: '553e8400-e29b-41d4-a716-446655440003',
          email: 'tourguide2@example.com',
          password:
            '$2b$12$rR8Vkt0iyOqjX.VdmN0eLeIRGw/03jhSE2Q1oN32tzqeykNLYf1De',
          role: 'tour guide',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
