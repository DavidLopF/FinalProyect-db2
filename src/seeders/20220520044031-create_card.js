'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //traer a todos los datos de la tabla Buyers
    let buyers = await queryInterface.sequelize.query(`
        SELECT * FROM "Buyers"
      `, { type: Sequelize.QueryTypes.SELECT });

    //crear una tarjeta por cada uno de los compradores
    let cards = buyers.map(buyer => {
      return {
        buyer_id: buyer.id,
        name: "card name test" + buyer.id,
        number: '1234567890123' + buyer.id,
        ccv: '123',
        expiration_month: '12',
        expiration_year: '2022',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Cards', cards, {});

    cards = await queryInterface.sequelize.query(`
        SELECT * FROM "Cards"
      `, { type: Sequelize.QueryTypes.SELECT });

    let paymentsTypes = cards.map(card => {
      if (card.id % 2 === 0) {
        return {
          card_id: card.id,
          type: 'debit',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      } else {
        return {
          card_id: card.id,
          type: 'credit',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    })
    await queryInterface.bulkInsert('Payment_types', paymentsTypes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
    await queryInterface.bulkDelete('Payment_types', null, {});
  }
};
