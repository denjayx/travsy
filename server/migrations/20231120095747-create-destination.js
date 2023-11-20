/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('destinations', {
      destinationId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        field: 'destination_id',
      },
      destinationName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'destination_name',
      },
      imageUrl: {
        type: Sequelize.STRING,
        field: 'image_url',
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'city',
      },
      description: {
        type: Sequelize.STRING,
        field: 'description',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('destinations');
  },
};
