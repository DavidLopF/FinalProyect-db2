'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shopping_car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shopping_car.hasMany(models.Product, {
        foreignKey: 'shopping_car_id',
        as: 'products'
      });
      Shopping_car.belongsTo(models.Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer'
      });
      Shopping_car.hasOne(models.Checkout_process, {
        foreignKey: 'shopping_car_id',
        as: 'checkout_process'
      });
    }
  }
  Shopping_car.init({
  }, {
    sequelize,
    modelName: 'Shopping_car',
  });
  return Shopping_car;
};