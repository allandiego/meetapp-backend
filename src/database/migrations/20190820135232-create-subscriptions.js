module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'subscriptions',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        meetup_id: {
          type: Sequelize.INTEGER,
          references: { model: 'meetups', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscriptions');
  },
};
