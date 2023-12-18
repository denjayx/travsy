/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('destinations', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        field: 'id',
      },
      packageId: {
        type: Sequelize.UUID,
        field: 'package_id',
      },
      destinationName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        field: 'destination_name',
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'city',
      },
      description: {
        type: Sequelize.TEXT,
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

    await queryInterface.addConstraint('destinations', {
      fields: ['package_id'],
      type: 'foreign key',
      name: 'fk_destination_package_id',
      references: {
        table: 'packages',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'destinations',
      'fk_destination_package_id',
    );

    await queryInterface.dropTable('destinations');
  },
};
