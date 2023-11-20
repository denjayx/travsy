'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      username: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
      },
      biography: {
        type: Sequelize.TEXT,
        field: 'biography',
      },
      nik: {
        type: Sequelize.STRING,
        field: 'nik',
      },
      phone: {
        type: Sequelize.STRING,
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
      cardNumber: {
        type: Sequelize.STRING,
        field: 'card_number',
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
        field: 'account_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'fk_users_account_id');

    await queryInterface.dropTable('users');
  },
};
