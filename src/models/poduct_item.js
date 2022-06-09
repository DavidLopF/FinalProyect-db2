'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_item.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
      Product_item.belongsTo(models.Shopping_car, {
        foreignKey: 'shopping_car_id',
        as: 'shopping_car'
      });
    }
  }
  Product_item.init({
  
  }, {
    sequelize,
    modelName: 'Product_item',
  });
  return Product_item;
};