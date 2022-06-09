'use strict';

const random = require('random');

module.exports = {
  async up(queryInterface, Sequelize) {
    let shopping_cars = await queryInterface.sequelize.query(`
        SELECT * FROM "Shopping_cars"
      `, { type: Sequelize.QueryTypes.SELECT });
    let buyer = await queryInterface.sequelize.query(`
      SELECT * FROM "Buyers"
    `, { type: Sequelize.QueryTypes.SELECT });
    let checkout_process = []
    for (let i = 0; i < 100; i++) {
      const random_shopping_car = random.int(0, shopping_cars.length - 1)
      const random_buyer = random.int(0, buyer.length - 1)
      checkout_process.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        shopping_car_id: shopping_cars[random_shopping_car].id,
        buyer_id: buyer[random_buyer].id,
      })
    }
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
    let cards = await queryInterface.sequelize.query(`
        SELECT * FROM "Cards"
      `, { type: Sequelize.QueryTypes.SELECT });
    let payment_type = await queryInterface.sequelize.query(`
        SELECT * FROM "Payment_types"
      `, { type: Sequelize.QueryTypes.SELECT });
    let payments = [];
    for (let i = 0; i < 100; i++) {
      const random_card = random.int(0, cards.length - 1)
      if (i % 2 == 0) {
        payments.push({
          createdAt: new Date(),
          updatedAt: new Date(),
          card_id: cards[random_card].id,
          payment_type_id: payment_type[0].id,
        })
      } else {
        payments.push({
          createdAt: new Date(),
          updatedAt: new Date(),
          card_id: cards[random_card].id,
          payment_type_id: payment_type[1].id,
        })
      }
    }
    await queryInterface.bulkInsert('Payments', payments, {});
    payments = await queryInterface.sequelize.query(`
        SELECT * FROM "Payments"
      `, { type: Sequelize.QueryTypes.SELECT });
    let orders = []
    for (let i = 0; i < 100; i++) {
      const random_payment = random.int(0, payments.length - 1)
      const random_shoppinng = random.int(0, shopping_cars.length - 1)
      const random_checkout_process = random.int(0, checkout_process.length - 1)
      const random_date = new Date(random.int(0, Date.now()))
      orders.push({
        createdAt: random_date,
        updatedAt: random_date,
        payment_id: payments[random_payment].id,
        shopping_car_id: shopping_cars[random_shoppinng].id,
        checkout_process_id: checkout_process[random_checkout_process].id,
        amount: Math.floor((Math.random() * (100 - 1 + 1)) + 1) * 10,
        status: true,
        buyer_id: shopping_cars[random_shoppinng].buyer_id
      })
    }
    await queryInterface.bulkInsert('Orders', orders, {})
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Checkout_processes', null, {});
    await queryInterface.bulkDelete('Shipment_details', null, {});
    await queryInterface.bulkDelete('Payments', null, {});
    await queryInterface.bulkDelete('Orders', null, {});

  }

};
