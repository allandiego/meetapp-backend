module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: '1',
          name: 'Usuário Organizador 1',
          email: 'organizador@meetapp.com',
          password_hash:
            '$2a$08$x447YIMjgsnVdCjdQS5Ueea229o7y8mbISqT6YZQSrRGZeGIIbkd.',
          created_at: '2019-08-20 16:56:03',
          updated_at: '2019-08-20 17:16:18',
        },
        {
          id: '2',
          name: 'Usuário 1 Participante',
          email: 'participante1@meetapp.com',
          password_hash:
            '$2a$08$vGsCosz7Zi8aVOu0Pby0zOpGebo5H9aHS1Kt2PTVvdSz4inqPLJQa',
          created_at: '2019-08-20 16:57:00',
          updated_at: '2019-08-20 16:57:00',
        },
        {
          id: '3',
          name: 'Usuário 2 Participante',
          email: 'participante2@meetapp.com',
          password_hash:
            '$2a$08$57YcEew/qcu9R1KfCPQ9Q.RzG2OH9FpvUFuZ6fNM5ZOi7zIIT5i9i',
          created_at: '2019-08-20 16:58:26',
          updated_at: '2019-08-20 16:58:26',
        },
        {
          id: '4',
          name: 'Usuário 3 Participante',
          email: 'participante3@meetapp.com',
          password_hash:
            '$2a$08$nznx5J789w97tphvZM5qSepl9ajxVPc8w/wlEEReuh0BojOLrOlAW',
          created_at: '2019-08-20 16:58:33',
          updated_at: '2019-08-20 16:58:33',
        },
        {
          id: '5',
          name: 'Usuário 4 Participante',
          email: 'participante4@meetapp.com',
          password_hash:
            '$2a$08$JP98tbcfvng.dRrEWIE0ju79tiz7Qu7F3VmS4E086oxmT7o15bd0K',
          created_at: '2019-08-20 16:58:48',
          updated_at: '2019-08-20 16:58:48',
        },
        {
          id: '6',
          name: 'Usuário 5 Participante',
          email: 'participante5@meetapp.com',
          password_hash:
            '$2a$08$2bqK.UqsVxdFjP0PHPlP4OnSUEtyyIQrtIOBVa.atunmCxkcoYXVa',
          created_at: '2019-08-20 17:16:01',
          updated_at: '2019-08-20 17:16:01',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
