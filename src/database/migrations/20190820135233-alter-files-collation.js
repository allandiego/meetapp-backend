module.exports = {
  up: (queryInterface, Sequelize) => {
    //  utf8mb4_bin for case sensitive generated code column
    return queryInterface.sequelize.query(
      'ALTER TABLE files CHANGE path path VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL'
    );
  },

  down: queryInterface => {
    return queryInterface.sequelize.query(
      'ALTER TABLE files CHANGE path path VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL'
    );
  },
};
