'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Payment_types, {
        foreignKey: 'payment_type_id',
        as: 'payment_type'
      });

      Payment.belongsTo(models.Card, {
        foreignKey: 'card_id',
        as: 'card'
      });

      Payment.hasOne(models.Order, {
        foreignKey: 'payment_id',
        as: 'order'
      });

    }
  }
  Payment.init({
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};