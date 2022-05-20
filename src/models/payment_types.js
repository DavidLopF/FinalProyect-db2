'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment_types.belongsTo(models.Card, {
        foreignKey: 'card_id',
        as: 'card'
      });
      Payment_types.hasMany(models.Payment, {
        foreignKey: 'payment_type_id',
        as: 'payments'
      });
    }
  }
  Payment_types.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment_types',
  });
  return Payment_types;
};