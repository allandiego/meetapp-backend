module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'meetups',
      [
        {
          id: '1',
          user_id: '1',
          file_id: '1',
          title: 'Encontro teste 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Maceió',
          date: '2019-11-23 16:00:00',
          created_at: '2019-08-20 17:32:12',
          updated_at: '2019-08-20 17:32:12',
        },
        {
          id: '2',
          user_id: '1',
          file_id: '2',
          title: 'Encontro teste 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Rio de Janeiro',
          date: '2019-11-24 16:00:00',
          created_at: '2019-08-20 17:32:21',
          updated_at: '2019-08-20 17:32:21',
        },
        {
          id: '3',
          user_id: '1',
          file_id: '3',
          title: 'Encontro teste 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Recife',
          date: '2019-11-25 16:00:00',
          created_at: '2019-08-20 17:32:32',
          updated_at: '2019-08-20 17:32:32',
        },
        {
          id: '4',
          user_id: '1',
          file_id: '1',
          title: 'Encontro teste 4',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'São Paulo',
          date: '2019-11-26 16:00:00',
          created_at: '2019-08-20 17:32:12',
          updated_at: '2019-08-20 17:32:12',
        },
        {
          id: '5',
          user_id: '1',
          file_id: '2',
          title: 'Encontro teste 5',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Rio de Janeiro',
          date: '2019-08-27 16:00:00',
          created_at: '2019-08-20 17:32:21',
          updated_at: '2019-08-20 17:32:21',
        },
        {
          id: '6',
          user_id: '1',
          file_id: '3',
          title: 'Encontro teste 6',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Recife',
          date: '2019-08-28 16:00:00',
          created_at: '2019-08-20 17:32:32',
          updated_at: '2019-08-20 17:32:32',
        },
        {
          id: '7',
          user_id: '1',
          file_id: '1',
          title: 'Encontro teste 7',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Minas Gerais',
          date: '2019-08-29 16:00:00',
          created_at: '2019-08-20 17:32:12',
          updated_at: '2019-08-20 17:32:12',
        },
        {
          id: '8',
          user_id: '1',
          file_id: '2',
          title: 'Encontro teste 8',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Rio de Janeiro',
          date: '2019-08-30 16:00:00',
          created_at: '2019-08-20 17:32:21',
          updated_at: '2019-08-20 17:32:21',
        },
        {
          id: '9',
          user_id: '1',
          file_id: '3',
          title: 'Encontro teste 9',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Recife',
          date: '2019-08-31 16:00:00',
          created_at: '2019-08-20 17:32:32',
          updated_at: '2019-08-20 17:32:32',
        },
        {
          id: '10',
          user_id: '1',
          file_id: '1',
          title: 'Encontro teste 10',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Aracaju',
          date: '2019-08-19 16:00:00',
          created_at: '2019-08-20 17:32:12',
          updated_at: '2019-08-20 17:32:12',
        },
        {
          id: '11',
          user_id: '1',
          file_id: '2',
          title: 'Encontro teste 11',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Rio de Janeiro',
          date: '2019-09-17 16:00:00',
          created_at: '2019-08-20 17:32:21',
          updated_at: '2019-08-20 17:32:21',
        },
        {
          id: '12',
          user_id: '1',
          file_id: '3',
          title: 'Encontro teste 12',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Recife',
          date: '2019-09-18 16:00:00',
          created_at: '2019-08-20 17:32:32',
          updated_at: '2019-08-20 17:32:32',
        },
        {
          id: '13',
          user_id: '2',
          file_id: '1',
          title: 'Encontro teste 13',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
          location: 'Macei\u00f3',
          date: '2019-09-27 16:00:00',
          created_at: '2019-08-21 10:47:03',
          updated_at: '2019-08-21 10:47:03',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('meetups', null, {});
  },
};
