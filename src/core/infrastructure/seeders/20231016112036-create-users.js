'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        uuid: '27b0600a-201b-4a3c-9a68-0d766b9fdae6',
        name: 'Bruce Wayne',
        alias: 'Batman',
        document: '30067012086',
        birth_date: '1972/02/19',
        gender: 'MALE',
        active: true,
        created_at: new Date(),
      },
      {
        uuid: '1ba6b445-1650-412e-9332-d5166b2e7d58',
        name: 'Peter Parker',
        alias: 'Spider-man',
        document: '30067012086',
        birth_date: '2002/08/10',
        gender: 'MALE',
        active: true,
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
