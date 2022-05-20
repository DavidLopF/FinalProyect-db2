'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id',
        as: 'supplier'
      });
      Product.hasOne(models.Product_details, {
        foreignKey: 'product_id',
        as: 'product_details'
      });
      Product.belongsTo(models.Shopping_car, {
        foreignKey: 'shopping_car_id',
        as: 'shopping_car'
      });
      Product.belongsTo(models.Product_category, {
        foreignKey: 'product_category_id',
        as: 'product_category'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};