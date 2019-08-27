module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          id: '1',
          path: 'placeholder1.jpg',
          name: 'banner1.jpg',
          created_at: '2019-08-20 17:19:07',
          updated_at: '2019-08-20 17:19:07',
        },
        {
          id: '2',
          path: 'placeholder2.jpg',
          name: 'banner2.jpg',
          created_at: '2019-08-20 17:19:33',
          updated_at: '2019-08-20 17:19:33',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
