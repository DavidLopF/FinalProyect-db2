'use strict';

const random = require('random');

module.exports = {
  async up(queryInterface, Sequelize) {
    let product_categories = []
    for (let i = 0; i < 5; i++) {
      product_categories.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Categoria ' + i,
        description: 'Descripcion de la categoria ' + i
      })
    }
    await queryInterface.bulkInsert('Product_categories', product_categories, {});
    product_categories = await queryInterface.sequelize.query(`
        SELECT * FROM "Product_categories"
      `, { type: Sequelize.QueryTypes.SELECT });

    let buyers = await queryInterface.sequelize.query(`
        SELECT * FROM "Buyers"
      `, { type: Sequelize.QueryTypes.SELECT });

    let shopping_cars = buyers.map(buyer => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
        buyer_id: buyer.id
      }
    })
    await queryInterface.bulkInsert('Shopping_cars', shopping_cars, {});
    shopping_cars = await queryInterface.sequelize.query(`
        SELECT * FROM "Shopping_cars"
      `, { type: Sequelize.QueryTypes.SELECT });

    let supplers = await queryInterface.sequelize.query(`
        SELECT * FROM "Suppliers"
      `, { type: Sequelize.QueryTypes.SELECT });

    let brand = []
    for (let i = 0; i < 5; i++) {
      brand.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Marca ' + i,
        country: 'Pais ' + i,
      })
    }
    await queryInterface.bulkInsert('Brands', brand, {});
    brand = await queryInterface.sequelize.query(`
        SELECT * FROM "Brands"
      `, { type: Sequelize.QueryTypes.SELECT });
    let products = []
    for (let i = 0; i < 100; i++) {
      const random_category = random.int(0, product_categories.length - 1)
      const random_brand = random.int(0, brand.length - 1)
      const random_suppler = random.int(0, supplers.length - 1)
      products.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Producto ' + i,
        description: 'Descripcion del producto ' + i,
        price: random.int(1000, 10000000),
        product_category_id: product_categories[random_category].id,
        brand_id: brand[random_brand].id,
        supplier_id: supplers[random_suppler].id,
      })
    }
    await queryInterface.bulkInsert('Products', products, {});
    products = await queryInterface.sequelize.query(`
        SELECT * FROM "Products"
      `, { type: Sequelize.QueryTypes.SELECT });

    let product_details = []
    for (let i = 0; i < 100; i++) {
      product_details.push({
        color: 'Color ' + i,
        size: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        product_id: products[i].id
      })
    }
    await queryInterface.bulkInsert('Product_details', product_details, {});

    let productItems = []
    for (let i = 0; i < 100; i++) {
      const random_shopping_car = random.int(0, shopping_cars.length - 1)
      let date = new Date();
      date.setDate(date.getDate() - Math.floor((Math.random() * (30 - 1 + 1)) + 1));
      productItems.push({
        product_id: products[i].id,
        createdAt: date,
        updatedAt: date,
        shopping_car_id: shopping_cars[random_shopping_car].id,
      })
    }
    await queryInterface.bulkInsert('Product_items', productItems, {});



  },
  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Product_categories', null, {});
    await queryInterface.bulkDelete('Shopping_cars', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Product_details', null, {});
    await queryInterface.bulkDelete('Brands', null, {});
    await queryInterface.bulkDelete('Product_items', null, {});

  }
};
