/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'packages',
      [
        {
          package_id: '750e8400-e29b-41d4-a716-446655440000',
          tour_guide_id: 'john_doe',
          package_name: 'Bali Explorer',
          price: 1500000,
          service_duration: 3,
        },
        {
          package_id: '751e8400-e29b-41d4-a716-446655440001',
          tour_guide_id: 'jane_smith',
          package_name: 'Cultural Delight',
          price: 1200000,
          service_duration: 2,
        },
        {
          package_id: '752e8400-e29b-41d4-a716-446655440002',
          tour_guide_id: 'bob_jackson',
          package_name: 'Beach Paradise',
          price: 1800000,
          service_duration: 4,
        },
        {
          package_id: '753e8400-e29b-41d4-a716-446655440003',
          tour_guide_id: 'alice_williams',
          package_name: 'Sacred Temples Tour',
          price: 1000000,
          service_duration: 1,
        },
        {
          package_id: '754e8400-e29b-41d4-a716-446655440004',
          tour_guide_id: 'john_doe',
          package_name: 'Rice Terraces Adventure',
          price: 1400000,
          service_duration: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('packages', null, {});
  },
};
