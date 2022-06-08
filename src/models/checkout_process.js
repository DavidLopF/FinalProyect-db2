'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout_process extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout_process.hasOne(models.Shopping_car, {
        foreignKey: 'shopping_car_id',
        as: 'shopping_car'
      });
      Checkout_process.belongsTo(models.Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer'
      });
      Checkout_process.hasOne(models.Shipment_details, {
        foreignKey: 'shipment_details_id',
        as: 'shipment_details'
      });
      Checkout_process.hasOne(models.Order, {
        foreignKey: 'order_id',
        as: 'order'
      });
    }
  }
  Checkout_process.init({
  }, {
    sequelize,
    modelName: 'Checkout_process',
  });
  return Checkout_process;
};