module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'files',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        path: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
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
    return queryInterface.dropTable('files');
  },
};
