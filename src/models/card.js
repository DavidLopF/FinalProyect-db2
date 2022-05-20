'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer'
      });
      Card.hasOne(models.Payment_types, {
        foreignKey: 'card_id',
        as: 'payment_type'
      });
    }
  }
  Card.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    expiration_month: DataTypes.STRING,
    expiration_year: DataTypes.STRING,
    ccv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};