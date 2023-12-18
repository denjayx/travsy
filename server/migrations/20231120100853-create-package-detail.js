/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('package_details', {
      packageId: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'package_id',
      },
      destinationId: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'destination_id',
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

    await queryInterface.addConstraint('package_details', {
      fields: ['package_id'],
      type: 'foreign key',
      name: 'fk_package_details_package_id',
      references: {
        table: 'packages',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('package_details', {
      fields: ['destination_id'],
      type: 'foreign key',
      name: 'fk_package_details_destination_id',
      references: {
        table: 'destinations',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('package_details', {
      fields: ['package_id', 'destination_id'],
      type: 'primary key',
      name: 'pk_package_details_package_id_destination_id',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'package_details',
      'fk_package_details_destination_id',
    );

    await queryInterface.removeConstraint(
      'package_details',
      'fk_package_details_package_id',
    );

    await queryInterface.dropTable('package_details');
  },
};
