'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let buyers = await queryInterface.sequelize.query(`
        SELECT * FROM "Buyers"
      `, { type: Sequelize.QueryTypes.SELECT });
    let cards = buyers.map(buyer => {
      return {
        buyer_id: buyer.id,
        name_card: 'Карта покупателя ' + buyer.name,
        number: '1111111111111111',
        expiration_month: '12',
        expiration_year: '2022',
        ccv: '123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Cards', cards, {});
    cards = await queryInterface.sequelize.query(`
        SELECT * FROM "Cards"
      `, { type: Sequelize.QueryTypes.SELECT });
    //meteren un array los tipos de pagos credito y debito
    let payment_types = [
      {
        type: 'credit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'debit',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Payment_types', payment_types, {});






  },



  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
    await queryInterface.bulkDelete('Payment_types', null, {});
  }
};
