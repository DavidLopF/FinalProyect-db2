'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.Payment, {
        foreignKey: 'payment_id',
        as: 'payment'
      });
      Order.belongsTo(models.Shopping_car, {
        foreignKey: 'shopping_car_id',
        as: 'shopping_car'
      });
      Order.belongsTo(models.Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer'
      });
      Order.belongsTo(models.Checkout_process, {
        foreignKey: 'checkout_process_id',
        as: 'checkout_process'
      });
    }
  }
  Order.init({
    status: DataTypes.BOOLEAN,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};