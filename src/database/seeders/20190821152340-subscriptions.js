module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'subscriptions',
      [
        {
          id: '1',
          meetup_id: '1',
          user_id: '2',
          created_at: '2019-08-21 10:51:54',
          updated_at: '2019-08-21 10:51:54',
        },
        {
          id: '2',
          meetup_id: '2',
          user_id: '2',
          created_at: '2019-08-21 10:59:14',
          updated_at: '2019-08-21 10:59:14',
        },
        {
          id: '3',
          meetup_id: '1',
          user_id: '3',
          created_at: '2019-08-21 11:08:16',
          updated_at: '2019-08-21 11:08:16',
        },
        {
          id: '4',
          meetup_id: '1',
          user_id: '4',
          created_at: '2019-08-21 11:08:53',
          updated_at: '2019-08-21 11:08:53',
        },
        {
          id: '5',
          meetup_id: '1',
          user_id: '5',
          created_at: '2019-08-21 11:09:22',
          updated_at: '2019-08-21 11:09:22',
        },
        {
          id: '6',
          meetup_id: '3',
          user_id: '2',
          created_at: '2019-08-21 11:23:12',
          updated_at: '2019-08-21 11:23:12',
        },
        {
          id: '7',
          meetup_id: '6',
          user_id: '3',
          created_at: '2019-08-21 11:24:47',
          updated_at: '2019-08-21 11:24:47',
        },
        {
          id: '8',
          meetup_id: '2',
          user_id: '3',
          created_at: '2019-08-21 11:25:12',
          updated_at: '2019-08-21 11:25:12',
        },
        {
          id: '9',
          meetup_id: '9',
          user_id: '4',
          created_at: '2019-08-21 11:29:17',
          updated_at: '2019-08-21 11:29:17',
        },
        {
          id: '10',
          meetup_id: '9',
          user_id: '5',
          created_at: '2019-08-21 11:29:56',
          updated_at: '2019-08-21 11:29:56',
        },
        {
          id: '11',
          meetup_id: '6',
          user_id: '5',
          created_at: '2019-08-21 11:40:25',
          updated_at: '2019-08-21 11:40:25',
        },
        {
          id: '12',
          meetup_id: '7',
          user_id: '5',
          created_at: '2019-08-21 11:44:14',
          updated_at: '2019-08-21 11:44:14',
        },
        {
          id: '13',
          meetup_id: '8',
          user_id: '5',
          created_at: '2019-08-21 12:07:29',
          updated_at: '2019-08-21 12:07:29',
        },
        {
          id: '14',
          meetup_id: '9',
          user_id: '3',
          created_at: '2019-08-21 12:08:54',
          updated_at: '2019-08-21 12:08:54',
        },
        {
          id: '15',
          meetup_id: '11',
          user_id: '3',
          created_at: '2019-08-21 12:12:14',
          updated_at: '2019-08-21 12:12:14',
        },
        {
          id: '16',
          meetup_id: '11',
          user_id: '5',
          created_at: '2019-08-21 13:45:28',
          updated_at: '2019-08-21 13:45:28',
        },
        {
          id: '17',
          meetup_id: '5',
          user_id: '5',
          created_at: '2019-08-21 14:19:29',
          updated_at: '2019-08-21 14:19:29',
        },
        {
          id: '18',
          meetup_id: '4',
          user_id: '5',
          created_at: '2019-08-21 14:21:21',
          updated_at: '2019-08-21 14:21:21',
        },
        {
          id: '19',
          meetup_id: '3',
          user_id: '5',
          created_at: '2019-08-21 14:22:50',
          updated_at: '2019-08-21 14:22:50',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions', null, {});
  },
};
