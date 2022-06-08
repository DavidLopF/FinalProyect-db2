'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /*let shopping_cars = await queryInterface.sequelize.query(`
        SELECT * FROM "Shopping_cars"
      `, { type: Sequelize.QueryTypes.SELECT });
    let checkout_process = shopping_cars.map(shopping_car => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        shopping_car_id: shopping_car.id,
      }
    })
    await queryInterface.bulkInsert('Checkout_processes', checkout_process, {});
    checkout_process = await queryInterface.sequelize.query(`
        SELECT * FROM "Checkout_processes"
      `, { type: Sequelize.QueryTypes.SELECT });
    let shipment_details = checkout_process.map(checkout_process => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        checkout_process_id: checkout_process.id,
        addres: 'calle 86 # 12-' + Math.floor((Math.random() * (9 - 1 + 1)) + 1),
        shipment_type: 'Envio a domicilio',
      }
    })
    await queryInterface.bulkInsert('Shipment_details', shipment_details, {});
    shipment_details = await queryInterface.sequelize.query(`
        SELECT * FROM "Shipment_details"
      `, { type: Sequelize.QueryTypes.SELECT });
    let payments = await queryInterface.sequelize.query(`
        SELECT * FROM "Payments"
      `, { type: Sequelize.QueryTypes.SELECT });

    let orders = []
    for (let i = 0; i < 5; i++) {
      orders.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        payment_id: payments[i].id,
        shipment_details_id: shipment_details[i].id,
        amount: Math.floor((Math.random() * (100 - 1 + 1)) + 1) * 10,
        status: true,
        buyer_id: shopping_cars[i].buyer_id
      })
    }

    await queryInterface.bulkInsert('Orders', orders, {});

*/

  },

  async down(queryInterface, Sequelize) {

    /*await queryInterface.bulkDelete('Checkout_processes', null, {});
    await queryInterface.bulkDelete('Shipment_details', null, {});
    await queryInterface.bulkDelete('Orders', null, {});*/

  }

};
