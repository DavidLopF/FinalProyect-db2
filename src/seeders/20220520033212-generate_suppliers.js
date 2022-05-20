'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {

    //Buscar 5 usuarios que no esten ni en la tabla buyers ni en la tabla admin
    let suppliers = await queryInterface.sequelize.query(`
        SELECT u.id
        FROM "Users" u
        WHERE u.id NOT IN (
          SELECT b.user_id
          FROM "Buyers" b
        )
        AND u.id NOT IN (
          SELECT a.user_id
          FROM "Admins" a
        )
        LIMIT 10
      `, { type: Sequelize.QueryTypes.SELECT });

    suppliers = suppliers.map(supplier => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: supplier.id,
        status: true
      }
    })

    await queryInterface.bulkInsert('Suppliers', suppliers, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
