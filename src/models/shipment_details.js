'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipment_details.belongsTo(models.Checkout_process, {
        foreignKey: 'checkout_process_id',
        as: 'checkout_process'
      });
    }
  }
  Shipment_details.init({
    addres: DataTypes.STRING,
    shipment_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shipment_details',
  });
  return Shipment_details;
};