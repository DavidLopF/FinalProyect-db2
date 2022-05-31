'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buyer.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Buyer.hasMany(models.Shopping_car, {
        foreignKey: 'buyer_id',
        as: 'shopping_cars'
      });
      Buyer.hasMany(models.Card, {
        foreignKey: 'buyer_id',
        as: 'cards'
      });
      Buyer.hasMany(models.Order, {
        foreignKey: 'buyer_id',
        as: 'orders'
      });
      Buyer.has_many(models.Checkout_process, {
        foreignKey: 'buyer_id',
        as: 'checkout_processes'
      })
    }
  }
  Buyer.init({
  }, {
    sequelize,
    modelName: 'Buyer',
  });
  return Buyer;
};