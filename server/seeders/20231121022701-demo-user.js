/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'john_doe',
          account_id: '550e8400-e29b-41d4-a716-446655440000',
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          username: 'jane_smith',
          account_id: '551e8400-e29b-41d4-a716-446655440001',
          first_name: 'Jane',
          last_name: 'Smith',
        },
        {
          username: 'bob_jackson',
          account_id: '552e8400-e29b-41d4-a716-446655440002',
          first_name: 'Bob',
          last_name: 'Jackson',
        },
        {
          username: 'alice_williams',
          account_id: '553e8400-e29b-41d4-a716-446655440003',
          first_name: 'Alice',
          last_name: 'Williams',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
