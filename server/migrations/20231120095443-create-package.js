/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('packages', {
      packageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        field: 'package_id',
      },
      tourGuideId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'tour_guide_id',
      },
      packageName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'package_name',
      },
      thumbnailUrl: {
        type: Sequelize.STRING,
        field: 'thumbnail_url',
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'price',
      },
      description: {
        type: Sequelize.TEXT,
        field: 'description',
      },
      serviceDuration: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'service_duration',
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

    await queryInterface.addConstraint('packages', {
      fields: ['tour_guide_id'],
      type: 'foreign key',
      name: 'fk_package_tour_guide_id',
      references: {
        table: 'users',
        field: 'username',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'packages',
      'fk_package_tour_guide_id',
    );

    await queryInterface.dropTable('packages');
  },
};
