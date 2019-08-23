module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          id: '1',
          path: '4e014dbba0e7e59f22bba2aa282e1f3e.jpg',
          name: 'banner1.jpg',
          created_at: '2019-08-20 17:19:07',
          updated_at: '2019-08-20 17:19:07',
        },
        {
          id: '2',
          path: '34e8efc3406688144f11f77bd2bde4e1.jpg',
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
