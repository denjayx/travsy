/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'destinations',
      [
        {
          destination_id: '650e8400-e29b-41d4-a716-446655440000',
          destination_name: 'Tanah Lot',
          city: 'Tabanan',
        },
        {
          destination_id: '651e8400-e29b-41d4-a716-446655440001',
          destination_name: 'Ubud',
          city: 'Gianyar',
        },
        {
          destination_id: '652e8400-e29b-41d4-a716-446655440002',
          destination_name: 'Kuta Beach',
          city: 'Badung',
        },
        {
          destination_id: '653e8400-e29b-41d4-a716-446655440003',
          destination_name: 'Besakih Temple',
          city: 'Karangasem',
        },
        {
          destination_id: '654e8400-e29b-41d4-a716-446655440004',
          destination_name: 'Tegallalang Rice Terraces',
          city: 'Gianyar',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('destinations', null, {});
  },
};
