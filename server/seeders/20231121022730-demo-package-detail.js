/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'package_details',
      [
        {
          package_id: '750e8400-e29b-41d4-a716-446655440000',
          destination_id: '650e8400-e29b-41d4-a716-446655440000',
        },
        {
          package_id: '750e8400-e29b-41d4-a716-446655440000',
          destination_id: '651e8400-e29b-41d4-a716-446655440001',
        },
        {
          package_id: '751e8400-e29b-41d4-a716-446655440001',
          destination_id: '652e8400-e29b-41d4-a716-446655440002',
        },
        {
          package_id: '751e8400-e29b-41d4-a716-446655440001',
          destination_id: '653e8400-e29b-41d4-a716-446655440003',
        },
        {
          package_id: '752e8400-e29b-41d4-a716-446655440002',
          destination_id: '654e8400-e29b-41d4-a716-446655440004',
        },
        {
          package_id: '752e8400-e29b-41d4-a716-446655440002',
          destination_id: '650e8400-e29b-41d4-a716-446655440000',
        },
        {
          package_id: '753e8400-e29b-41d4-a716-446655440003',
          destination_id: '651e8400-e29b-41d4-a716-446655440001',
        },
        {
          package_id: '753e8400-e29b-41d4-a716-446655440003',
          destination_id: '652e8400-e29b-41d4-a716-446655440002',
        },
        {
          package_id: '754e8400-e29b-41d4-a716-446655440004',
          destination_id: '653e8400-e29b-41d4-a716-446655440003',
        },
        {
          package_id: '754e8400-e29b-41d4-a716-446655440004',
          destination_id: '654e8400-e29b-41d4-a716-446655440004',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('package_details', null, {});
  },
};
