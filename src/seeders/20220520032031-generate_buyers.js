'use strict';
const db = require('../models/index');

module.exports = {
  async up(queryInterface, Sequelize) {
    //Buscar 5 usuarios que no esten ni en la tabla supplier ni en la tabla admin
    let buyers = await queryInterface.sequelize.query(`
          SELECT u.id
          FROM "Users" u
          WHERE u.id NOT IN (
            SELECT s.user_id
            FROM "Suppliers" s
          )
          AND u.id NOT IN (
            SELECT a.user_id
            FROM "Admins" a
          )
          LIMIT 10
        `, { type: Sequelize.QueryTypes.SELECT });


    buyers = buyers.map(buyer => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: buyer.id,
      }
    })

    await queryInterface.bulkInsert("Buyers", buyers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Buyers", null, {});
  }
};
