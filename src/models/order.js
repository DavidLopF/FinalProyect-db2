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
      Order.belongsTo(models.Payment, {
        foreignKey: 'payment_id',
        as: 'payment'
      });
      Order.belongsTo(models.Shipment_details, {
        foreignKey: 'shipment_details_id',
        as: 'shipment_details'
      });
      Order.belongsTo(models.Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer'
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