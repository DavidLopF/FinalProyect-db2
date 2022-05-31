'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PoductItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PoductItem.init({
    product_id: DataTypes.INTEGER,
    shopping_car_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PoductItem',
  });
  return PoductItem;
};