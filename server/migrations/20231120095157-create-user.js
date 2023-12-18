/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      username: {
        primaryKey: true,
        type: Sequelize.STRING(15),
        field: 'username',
      },
      accountId: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        field: 'account_id',
      },
      avatarUrl: {
        type: Sequelize.STRING,
        field: 'avatar_url',
      },
      firstName: {
        type: Sequelize.STRING(15),
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING(15),
        field: 'last_name',
      },
      biography: {
        type: Sequelize.TEXT,
        field: 'biography',
      },
      nik: {
        type: Sequelize.STRING(16),
        field: 'nik',
      },
      phone: {
        type: Sequelize.STRING(13),
        field: 'phone',
      },
      province: {
        type: Sequelize.STRING,
        field: 'province',
      },
      city: {
        type: Sequelize.STRING,
        field: 'city',
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['L', 'P'],
        field: 'gender',
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

    await queryInterface.addConstraint('users', {
      fields: ['account_id'],
      type: 'foreign key',
      name: 'fk_users_account_id',
      references: {
        table: 'accounts',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('users', 'fk_users_account_id');

    await queryInterface.dropTable('users');
  },
};
