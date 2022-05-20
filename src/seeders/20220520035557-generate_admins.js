'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //Buscar 5 usuarios que no esten ni en la tabla buyers ni en la tabla supplier
    let users = await queryInterface.sequelize.query(`  
        SELECT u.id
        FROM "Users" u
        WHERE u.id NOT IN (
          SELECT b.user_id
          FROM "Buyers" b
        )
        AND u.id NOT IN (
          SELECT s.user_id
          FROM "Suppliers" s
        )
        LIMIT 10
      `, { type: Sequelize.QueryTypes.SELECT });

    users = users.map(user => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: user.id,
      }
    })

    await queryInterface.bulkInsert("Admins", users, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
