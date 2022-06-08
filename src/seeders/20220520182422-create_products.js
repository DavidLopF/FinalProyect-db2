'use strict';

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

    let brands = []
    brands.push({
      name: 'Apple', 
      country: 'Usa',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await queryInterface.bulkInsert('Brands', brands, {});

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
    
    let brands_query = await queryInterface.sequelize.query(
      `SELECT * FROM "Brands"`,
      { type: Sequelize.QueryTypes.SELECT }
    )


    let products = []
    //crear 5 productos por cada shopping_car
    for (let i = 0; i < 5; i++) {
      products.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Producto ' + i,
        price: i * 10,
        brand_id: brands_query[0].id,
        product_category_id: product_categories[i].id,
        supplier_id: supplers[i].id

      })
    }
    await queryInterface.bulkInsert('Products', products, {});

    products = await queryInterface.sequelize.query(`
        SELECT * FROM "Products"
      `, { type: Sequelize.QueryTypes.SELECT });

    let product_details = []
    for (let i = 0; i < 5; i++) {
      product_details.push({
        color: 'Color ' + i,
        size: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        product_id: products[i].id
      })
    }

    await queryInterface.bulkInsert('Product_details', product_details, {});
    
   

  },
  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Product_categories', null, {});
    await queryInterface.bulkDelete('Shopping_cars', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Product_details', null, {});

  }
};
