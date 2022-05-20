'use strict';

const bycript = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = []
    const pass = await bycript.hash('123456', 10);
    for (let i = 0; i < 30; i++) {
      users.push({
        id_number_type: 'CC',
        id_number: '12345678' + i,
        full_name: 'Juan test' + i,
        email: 'user' + i + '@gmail.com',
        cellphone: '123456789',
        address: 'Calle falsa 123',
        city: 'Ciudad falsa',
        password: pass,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Users', users ,{});
   
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
